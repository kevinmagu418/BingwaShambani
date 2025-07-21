import express from 'express';
import cors from 'cors';
import predictRouter from './routes/predict.route.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { ErrorHandler } from './middleware/error-handler.middleware.js';
import { auth } from './middleware/Authmiddleware.js';
import authRouter from './routes/auth.routes.js';
import './auth/passport/google.strategy.js'; //  boot order ake sure this is executed
import './auth/passport/github.strategy.js'; // ← register GitHub strategy
const app = express();
dotenv.config();
const port = parseInt(process.env.PORT || "3001");
app.use(cookieParser()); // ← enable reading cookies
app.use(cors({ origin: process.env.FRONTEND_BASE_URL,
    credentials: true, }));
app.use(express.json());
//  Log all incoming HTTP requests
app.use(morgan('dev'));
//public routes
app.use(passport.initialize());
app.use('/auth', authRouter);
//auth guard -all protected routes
app.use(auth);
//ROUTER PREDICTIONS
app.use('/api', predictRouter);
app.use(ErrorHandler); //custom error handles
app.listen(port, () => {
    console.log(` Server running on http://localhost:${port}`);
});
