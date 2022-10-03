/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UtilityService } from './utility.service';

@Controller('utility')
export class UtilityController {
  constructor(private readonly utilityService: UtilityService) {}

  @UseInterceptors(
    FileInterceptor('image-file', {
      storage: diskStorage({
        filename: (req, file, callback) => {
          callback(null, `${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Post()
  create(@UploadedFile() file) {
    return this.utilityService.uploadImage(file.path);
  }

  //     @Post('upload')
  //     @UseInterceptors(FileInterceptor('image-file'))
  //     uploadFile(@UploadedFile() file: any) {
  //         return this.utilityService.uploadImage(file.path);

  // }
}
