import cloudinary from "../../config/cloudinary";

import { UploadApiResponse } from 'cloudinary';

export const uploadToCloudinary = async (
  filePath: string,
  folder = 'Bingwa'
): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: 'image',
  });
};