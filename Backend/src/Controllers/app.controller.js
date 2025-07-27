import catchAsyncError from "../Middlewares/catchAsyncError.js";
import { File } from "../Models/file.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";
import { analyseDoc, saveFileMetadata } from "../Utils/file.js";


export const uploadDocument = catchAsyncError(async (req, res, next) => {

    const file = req.file;

    let fileInDb;

    try {
        // since at this point file is already uploaded, so just save the file metadata to db
        fileInDb = await saveFileMetadata(file);
    } catch (error) {
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        throw new ApiError(500, "FileUploadError", error.message)
    }

    const response = new ApiResponse(201, "File uploaded successfully", {file, fileInDb})

    return res.status(response.statusCode).json(response);

})


export const getAllDocs = catchAsyncError(async (req, res, next) => {
    
    const documents = await File.find({});

    const response = new ApiResponse(200, "All documents fetched", documents);

    return res.status(response.statusCode).json(response);
})


export const getDocumentById = catchAsyncError(async (req, res, next) => {
    
    const id = req.params.id;

    const document = await File.findById(id);

    if(!document){
        throw new ApiError(404, "FileNotFoundError", "invalid file id");
    }

    const response = new ApiResponse(200, "file found", document)
    res.status(response.statusCode).json(response);

})


export const getDocumentByName = catchAsyncError(async (req, res, next) => {

    // const originalName = req.params.name;
    const originalName = req.body.name;

    if(!originalName){
        throw new ApiError(404, "NameNotFoundError", "file name not found in request");
    }

    const documents = await File.find({originalName})

    if(!documents && documents.length === 0){
        throw new ApiError(404, "FileNotFoundError", "please provide a valid file name with extension")
    }

    const response = new ApiResponse(200, "", documents);
    res.status(response.statusCode).json(response);
})


export const analyseDocument = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    const document = await File.findById(id);

    if(!document){
        throw new ApiError(404, "FileNotFoundError", "invalid file id");
    }

    const responseData = await analyseDoc(document);

    const response = new ApiResponse(200, "", responseData);

    return res.status(response.statusCode).json(response);
})