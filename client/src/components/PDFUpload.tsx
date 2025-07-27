import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Loader2, CheckCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Document } from "@shared/schema";

interface PDFUploadProps {
  onUploadComplete?: (document: Document) => void;
}

export const PDFUpload: React.FC<PDFUploadProps> = ({ onUploadComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File): Promise<Document> => {
      const formData = new FormData();
      formData.append('pdf', file);
      
      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: (document: Document) => {
      setUploadProgress(100);
      toast({
        title: "Upload Successful",
        description: `${document.filename} has been uploaded successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      onUploadComplete?.(document);
      
      // Reset after a short delay
      setTimeout(() => {
        setSelectedFile(null);
        setUploadProgress(0);
      }, 2000);
    },
    onError: (error: any) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload PDF file.",
        variant: "destructive",
      });
      setSelectedFile(null);
      setUploadProgress(0);
    },
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      console.log("File dropped:", file.name, file.type);
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        console.log("PDF file selected:", file.name);
      } else {
        console.log("Invalid file type:", file.type);
        toast({
          title: "Invalid File Type",
          description: "Please select a PDF file.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("File selected:", file.name, file.type);
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        console.log("PDF file selected:", file.name);
      } else {
        console.log("Invalid file type:", file.type);
        toast({
          title: "Invalid File Type",
          description: "Please select a PDF file.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  const handleUpload = useCallback(() => {
    if (selectedFile) {
      setUploadProgress(10);
      uploadMutation.mutate(selectedFile);
    }
  }, [selectedFile, uploadMutation]);

  const openFileDialog = useCallback(() => {
    console.log("Opening file dialog, fileInputRef:", fileInputRef.current);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("File input ref is null");
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileSelect}
        className="hidden"
        style={{ display: 'none' }}
      />

      {!selectedFile ? (
        <Card
          className={`relative border-2 border-dashed transition-all duration-200 cursor-pointer bg-white/5 backdrop-blur-sm ${
            dragActive
              ? "border-[#ca6a34] bg-[#ca6a34]/10"
              : "border-gray-600 hover:border-[#ca6a34]/70"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => {
            console.log("Card clicked - opening file dialog");
            openFileDialog();
          }}
        >
          <CardContent className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="mb-6">
              <Upload size={64} className={`text-gray-400 ${dragActive ? "text-[#ca6a34]" : ""}`} />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {dragActive ? "Drop PDF File Here" : "DRAG & DROP THE PDF FILE"}
            </h3>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Click here or drag and drop your PDF file to upload. Maximum file size: 10MB
            </p>
            
            <Button 
              className="bg-[#531f17] text-white hover:bg-[#3f1711] rounded-[10px] px-8 py-3"
              onClick={() => {
                console.log("Button clicked - opening file dialog");
                openFileDialog();
              }}
              type="button"
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose PDF File
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/5 backdrop-blur-sm border border-gray-600">
          <CardContent className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <FileText size={48} className="text-[#ca6a34]" />
              <div className="flex-1">
                <h4 className="text-white font-semibold text-lg">{selectedFile.name}</h4>
                <p className="text-gray-300 text-sm">{formatFileSize(selectedFile.size)}</p>
              </div>
              {uploadProgress === 100 ? (
                <CheckCircle size={24} className="text-green-500" />
              ) : uploadMutation.isPending ? (
                <Loader2 size={24} className="text-[#ca6a34] animate-spin" />
              ) : null}
            </div>

            {uploadMutation.isPending && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {!uploadMutation.isPending && uploadProgress !== 100 && (
              <div className="flex space-x-4">
                <Button
                  onClick={handleUpload}
                  className="bg-[#ca6a34] text-white hover:bg-[#b85a2e] rounded-[10px] px-8 py-3 flex-1"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload & Analyze
                </Button>
                <Button
                  onClick={() => setSelectedFile(null)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 rounded-[10px] px-6 py-3"
                >
                  Cancel
                </Button>
              </div>
            )}

            {uploadProgress === 100 && (
              <div className="text-center">
                <p className="text-green-400 mb-4">✓ File uploaded successfully!</p>
                <Button
                  onClick={() => {
                    setSelectedFile(null);
                    setUploadProgress(0);
                  }}
                  className="bg-[#ca6a34] text-white hover:bg-[#b85a2e] rounded-[10px] px-8 py-3"
                >
                  Upload Another File
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};