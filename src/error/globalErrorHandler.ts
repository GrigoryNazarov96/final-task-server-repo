import { NextFunction, Request, Response } from 'express';
import { CastError } from 'mongoose';
import { AppError } from './appError';

const sendErrorDev = (err: AppError, _req: Request, res: Response): void => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (
  err: AppError,
  _req: Request,
  res: Response,
): void | Response<any, Record<string, any>> => {
  if (err.isOperational) {
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

const handleCastErrorDB = (err: CastError): AppError => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 404);
};

const handleDuplicateFieldsDB = (err: any): AppError => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 404);
};

const handleJWTError = () => new AppError('Invalid token. Please log in again', 401);
const handleJWTExpiredError = () => new AppError('Your token expired. Please log in again', 401);

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
): void | Response => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  } else if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  }
};
