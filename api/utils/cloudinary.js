import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// export const uploadOnCloudinary = async (file, folder = 'default') => {
//   try {
//     const result = await cloudinary.uploader.upload(file,{
//       folder: folder 
//     });

//     // Delete the file from local storage
//     // setTimeout(() => fs.unlink(file.path, (err) => {
//     //   if (err) console.error('Error deleting local file:', err);
//     // }), 5000);
    
//     return result.secure_url; 
//   } catch (err) {
//     console.error('Cloudinary upload failed:', err);
//     return null;
//   }
// }
export const uploadOnCloudinary = async (file,folder = 'default') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image',
        folder,
       },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);

  })
};