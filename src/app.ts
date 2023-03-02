import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import itemRouter from './routes/itemRoutes';
import reviewRouter from './routes/reviewRoutes';
import collectionRouter from './routes/collectionRoutes';
import likeRouter from './routes/likeRoutes';
import searchRouter from './routes/searchRoutes';
import featuredRouter from './routes/featuredRoute';
import { globalErrorHandler } from './error/globalErrorHandler';
import { AppError } from './error';

const app = express();

//setting cors
app.use(cors({ origin: `${process.env.CLIENT_URL_DEV}`, credentials: true }));

//json parser
app.use(express.json());

//cookie-parser
app.use(cookieParser());

//app routing
app.use('/api/users', userRouter);
app.use('/api/items', itemRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/collections', collectionRouter);
app.use('/api/likes', likeRouter);
app.use('/api/search', searchRouter);
app.use('/api/featured', featuredRouter);

//Global Error Handling
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
