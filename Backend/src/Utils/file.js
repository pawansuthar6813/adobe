import { File } from "../Models/file.model.js";
import ApiError from "./ApiError.js";


// Save file metadata after upload
export const saveFileMetadata = async (fileData) => {
    try {
        const file = new File({
            originalName: fileData.originalname,
            storedName: fileData.filename,
            path: fileData.path,
            size: fileData.size,
            mimetype: fileData.mimetype,
        });
        
        await file.save();
        return file;
    } catch (error) {
        throw new ApiError(500, 'InternalServerError', `Failed to save file metadata: ${error.message}`);
    }
};


export const analyseDoc = async (file) => {

}