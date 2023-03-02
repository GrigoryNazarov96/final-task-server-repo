"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const mongoose_1 = require("mongoose");
class AppError extends mongoose_1.Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        mongoose_1.Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=appError.js.map