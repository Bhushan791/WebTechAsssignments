import { ApiError } from "../utils/apiError.js";

export const errorHandler = (err, req, res, next) => {
    console.error("🔴 Error caught by errorHandler:", err);
    
    let error = err;

    // If error is not ApiError, convert it
    if (!(err instanceof ApiError)) {
        const statusCode = err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        error = new ApiError(statusCode, message, err?.errors || []);
        console.error("🔴 Converted to ApiError:", error);
    }

    const response = {
        success: false,
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors || [],
        ...(process.env.NODE_ENV === "development" && { stack: error.stack })
    };

    console.error("🔴 Sending error response:", response);
    return res.status(error.statusCode).json(response);
};