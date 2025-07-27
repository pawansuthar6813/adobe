import { check, validationResult } from 'express-validator';
import ApiError from '../Utils/ApiError.js';

const fileValidations = [
    // Custom validator to check file presence and type
    check('file').custom((value, { req }) => {
        const file = req.file;
        if (!file) {
            throw new ApiError(400, 'FileNotFoundError', 'File is required');
        }

        const allowedTypes = ['application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new ApiError(422, 'FileNotSupportedError','Only PDF files are allowed');
        }

        // Optional: File size check (already in multer, but can double-check)
        if (file.size > 10 * 1024 * 1024) {
            throw new ApiError(422, 'LargeFileError','File must be less than 10MB');
        }

        return true;
    })
];


export default fileValidations;
