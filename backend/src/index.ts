import'dotenv/config';
import express from 'express';
import connectDatabase from './config/db';
import { NODE_ENV,PORT ,APP_ORIGIN} from './constants/env';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import catchErrors from './utils/catchErrors';
import { OK } from './constants/http';
import authRouter from './routes/auth.route';





const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: APP_ORIGIN, credentials: true }));
app.use(cookieParser());




app.get('/', (req, res,next) => {
    
        throw new Error('This is an test error');
        res.status(OK).json({ status: 'Hello World '})
})


// auth routes
app.use('/auth',authRouter);


// Error handler
app.use(errorHandler);



app.listen(PORT, async() => {
  console.log(`Server is running on ${PORT} in ${NODE_ENV} mode`);
  await connectDatabase();

});