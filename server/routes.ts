import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDocumentSchema } from "@shared/schema";
import multer from "multer";
import path from "path";

// Extend Express Request type to include file property
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload PDF document
  app.post("/api/documents/upload", upload.single('pdf'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No PDF file uploaded" });
      }

      const document = await storage.createDocument({
        filename: req.file.originalname,
        fileSize: req.file.size,
      });

      res.json(document);
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Failed to upload document" });
    }
  });

  // Get all documents
  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getAllDocuments();
      res.json(documents);
    } catch (error) {
      console.error("Get documents error:", error);
      res.status(500).json({ message: "Failed to get documents" });
    }
  });

  // Get specific document
  app.get("/api/documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      res.json(document);
    } catch (error) {
      console.error("Get document error:", error);
      res.status(500).json({ message: "Failed to get document" });
    }
  });

  // Analyze document
  app.post("/api/documents/:id/analyze", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Simulate analysis (in real app, this would call AI/ML service)
      const analysisResult = {
        structure: {
          sections: [
            { title: "Introduction", pages: [1, 2] },
            { title: "Main Content", pages: [3, 5] },
            { title: "Conclusion", pages: [6] }
          ]
        },
        insights: [
          "Document contains technical specifications",
          "Key topics identified: AI, Machine Learning, Analysis",
          "Recommended for technical audience"
        ],
        summary: "This document provides comprehensive information about AI/ML document analysis techniques."
      };

      const updatedDocument = await storage.updateDocumentAnalysis(id, JSON.stringify(analysisResult));
      
      res.json(updatedDocument);
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ message: "Failed to analyze document" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
