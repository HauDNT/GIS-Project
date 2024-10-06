import { 
    Controller,
    Param,
    Post,  
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Express } from 'express';

const filesService = new FilesService();

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) { };

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: filesService.getMulterStorage('staffs'),
    }))
    uploadFile(
        @UploadedFile() file: Express.Multer.File,
    ) {
        const fileName = this.filesService.handleFileUpload(file).filename;

        return fileName;
    }
}
