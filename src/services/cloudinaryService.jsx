
import axios from 'axios';


const cloudName = process.env.REACT_APP_CLOUD_NAME;
const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

/**
 * Uploads an image file to Cloudinary and returns the image URL.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The URL of the uploaded image.
 */

 const uploadImageToCloudinary = async (file) => {

    const maxFileSize = 5 * 1024 * 1024; 
    const allowedTypes = ["image/jpeg", "image/png"];

    
    if (!allowedTypes.includes(file.type)) {
        throw new Error("Solo están permitidos archivos JPG y PNG.");
    }

    if (file.size > maxFileSize) {
        throw new Error("El tamaño del archivo supera el límite máximo de 5 MB.");
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
        return response.data.secure_url; 
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Failed to upload image to Cloudinary.");
    }
};

export default uploadImageToCloudinary;