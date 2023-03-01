import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

process.on('uncaughtException', (err: Error) => {
  console.log(err.stack);
  console.log('UNCAUGHT EXCEPTION!!');
  process.exit(1);
});

import app from './app';

const port = process.env.PORT || 5001;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB as string, () => {
  console.log('DB connection successful');
});

const server = app.listen(port, () => {
  console.log(`App started on ${port} port`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION');
  server.close(() => {
    process.exit(1);
  });
});
