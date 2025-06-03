// upload.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

@Injectable()
export class UploadService {
  async uploadImage(path: string): Promise<string> {
    const result = await cloudinary.uploader.upload(path, {
      folder: 'profile_pictures',
    });
    return result.secure_url; // return this URL to Flutter
  }
}
