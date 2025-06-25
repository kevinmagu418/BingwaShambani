import express from 'express';
import cors from 'cors';
import predictRouter from './routes/predict.route';
import morgan from 'morgan';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const port: number = parseInt(process.env.PORT || "3001");


app.use(cors());
app.use(express.json());



//  Log all incoming HTTP requests
app.use(morgan('dev'));

app.use('/api',predictRouter );

app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
