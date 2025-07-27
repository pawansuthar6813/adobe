// models/File.js (MongoDB/Mongoose)
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true
    },
    storedName: {
        type: String,
        required: true,
        unique: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
});

export const File = mongoose.model('File', fileSchema);

