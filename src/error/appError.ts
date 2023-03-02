import { Error } from 'mongoose';

export interface AppError {
  message: string;
  statusCode: number;
  status: string;
  isOperational: boolean;
}

export class AppError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
