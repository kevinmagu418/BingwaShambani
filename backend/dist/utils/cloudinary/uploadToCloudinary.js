import cloudinary from "../../config/cloudinary";
export const uploadToCloudinary = async (filePath, folder = 'Bingwa') => {
    return await cloudinary.uploader.upload(filePath, {
        folder,
        resource_type: 'image',
    });
};
