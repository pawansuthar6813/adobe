import { validationResult } from "express-validator";
import ApiError from "../Utils/ApiError.js";

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        // Check if one of the validations threw a custom ApiError
        const customError = errors.array().find(err => err instanceof ApiError);

        if (customError) return next(customError);

        
        const err = new ApiError(400, "ValidationError", "please provide valid information");
        err.errors = errors.array();
        return next(err);
        
    }
    next();
};

export default validateRequest;