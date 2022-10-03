/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Cloudinary = require('cloudinary');

@Injectable()
export class UtilityService {
  constructor(private configService: ConfigService) {
    Cloudinary.config({
      cloud_name: configService.get('Cloud_name'),
      api_key: configService.get('Api_key'),
      api_secret: configService.get('Api_secret'),
    });
  }
  async uploadImage(file: any) {
    const result = await Cloudinary.v2.uploader.upload(file);
    const imageUrl = result.secure_url;
    const cloudinary_id = result.public_id;
    if (!result) {
      console.log('DANGERRR!!!');
    } else {
      return { imageUrl, cloudinary_id };
    }
    //  await Cloudinary.v2.uploader.upload(file,
    //     function(error, result)
    //     {console.log(result, error)})
  }
}
