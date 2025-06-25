// predict.controller.ts
import { Request, Response } from 'express';
import fs from 'fs';
//fs is node inbuilt   filesystem module , used to read the uploaded image file and later dlete it from server after use
import axios from 'axios';
import FormData from 'form-data';//A libray to build multipart/form-data requests manually in node ,like what the browser does in form =files
import { FLASK_URL } from '../config/flask';


export const predictDisease = async (req: Request, res: Response): Promise<void> => {
  const crop = req.body.crop;
//extract the crop field from the request body from frontend
// req.file-is creted  by upload.single('image)
  const imagePath = req.file?.path;//?optional chaining in typescript -safely access path only if the file exists

  if (!imagePath) {
    res.status(400).json({ error: 'No image uploaded' });
    return;
  }

  try {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath));
    formData.append('crop', crop);

    const response = await axios.post(`${FLASK_URL}/predict`, formData, {
      headers: formData.getHeaders(),//need to set headers manually for it to be parsed correctly
    });

    fs.unlinkSync(imagePath); // Cleanup the uploaded file-synchronous method to delete the temporary  file
    res.status(200).json({ prediction: response.data.prediction});
  } catch (err) {
    console.error('Flask call failed:', err);
    res.status(500).json({ error: 'Prediction failed' });
  }
};
