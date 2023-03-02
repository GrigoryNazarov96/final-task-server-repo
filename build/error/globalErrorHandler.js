"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const appError_1 = require("./appError");
const sendErrorDev = (err, _req, res) => {
    console.log(err);
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorProd = (err, _req, res) => {
    console.log(err);
    if (!err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    console.log('ERROR', err);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
    });
};
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new appError_1.AppError(message, 404);
};
const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue.name;
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new appError_1.AppError(message, 404);
};
const handleJWTError = () => new appError_1.AppError('Invalid token. Please log in again', 401);
const handleJWTExpiredError = () => new appError_1.AppError('Your token expired. Please log in again', 401);
const globalErrorHandler = (err, req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        if (error.name === 'CastError')
            error = handleCastErrorDB(error);
        if (error.code === 11000)
            error = handleDuplicateFieldsDB(error);
        if (error.name === 'JsonWebTokenError')
            error = handleJWTError();
        if (error.name === 'TokenExpiredError')
            error = handleJWTExpiredError();
        return sendErrorProd(error, req, res);
    }
    else if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map