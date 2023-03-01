import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import itemRouter from './routes/itemRoutes';
import reviewRouter from './routes/reviewRoutes';
import collectionRouter from './routes/collectionRoutes';
import likeRouter from './routes/likeRoutes';
import searchRouter from './routes/searchRoutes';
import { globalErrorHandler } from './error/globalErrorHandler';

const app = express();

//setting cors
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));

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

//Global Error Handling
app.use(globalErrorHandler);

export default app;
