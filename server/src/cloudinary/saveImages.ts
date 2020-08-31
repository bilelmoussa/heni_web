import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '../config';

cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET 
});

const uploadImage = (image: any) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(image.path, { tags: `${CLOUDINARY_CLOUD_NAME}_sample` }, (err, url) => {
              if (err) return reject(err);
              return resolve(url);
            });
        })
}

export{ uploadImage };
