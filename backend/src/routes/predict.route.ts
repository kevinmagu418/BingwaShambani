import { Router } from 'express';
import upload from '../middleware/multer.js';
import { predictDisease } from '../controllers/predict.controller.js';


const  predictRouter = Router();

predictRouter.post('/predict', upload.single('image'), predictDisease);

export default predictRouter;
//s a middleware from Multer that:intercepts the request

  //  Looks for a field named "image" in the form

   // Parses the file and saves it (e.g. to /uploads)

  //  Attaches metadata about the file to req.file

 //   Then calls next() to pass control to the next function,predictDisease