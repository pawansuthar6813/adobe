import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import ApiError from '../Utils/ApiError.js';

// Get current directory (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
    // Destination folder where files will be stored
    destination: function (req, file, cb) {
        cb(null, './uploads/') // Files will be stored in 'uploads' folder
    },
    
    // Configure filename
    filename: function (req, file, cb) {
        // Create unique filename: timestamp + original name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter function (optional - for file type validation)
const fileFilter = (req, file, cb) => {
    // 1. Check file presence
    if (!file) {
        return cb(new ApiError(400, 'FileNotFoundError', 'File is required'), false);
    }

    // 2. Validate MIME type
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new ApiError(422, 'FileNotSupportedError', 'Only PDF files are allowed'), false);
    }

    // 3. Extension check (optional, defensive)
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.pdf') {
        return cb(new ApiError(422, 'FileExtensionError', 'Only .pdf files are allowed'), false);
    }

    // File passed all checks
    cb(null, true);
};


// Create multer instance with configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB file size limit
    },
    fileFilter: fileFilter
});

export default upload;