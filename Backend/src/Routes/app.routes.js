import express from 'express';
import { uploadDocument, getAllDocs, getDocumentById, analyseDocument, getDocumentByName } from '../Controllers/app.controller.js'
import upload from '../Config/multer.config.js'
import fs from 'fs'
import validateRequest from '../Middlewares/validateRequest.js';
import fileValidations from '../Validations/fileValidations.js';

// Ensure uploads directory exists
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const appRouter = express.Router();

appRouter.route("/documents/upload").post(upload.single('file'), uploadDocument);
appRouter.route("/documents").get(getAllDocs);
appRouter.route("/documents/:id").get(getDocumentById);
appRouter.route("/documents-name").post(getDocumentByName);
appRouter.route("/documents/:id/analyze").post(analyseDocument);

export default appRouter;