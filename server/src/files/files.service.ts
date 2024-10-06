// src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

@Injectable()
export class FilesService {
    getMulterStorage(type: string) {
        return diskStorage({
            destination: (req, file, save) => {
                let dirName = 'public/';

                switch (type) {
                    case 'customers':
                        dirName += 'customers/';
                        break;
                    case 'warehouses':
                        dirName += 'warehouses/';
                        break;
                    case 'staffs':
                        dirName += 'staffs';
                        break;
                    default:
                        dirName += type;
                        break;
                };

                if (!fs.existsSync(dirName)) {
                    fs.mkdirSync(dirName, { recursive: true });
                };

                save(null, dirName);
            },
            filename: (req, file, save) => {
                const uniqueSuffix = uuidv4(); // Tạo một ID duy nhất cho file
                const ext = file.originalname.split('.').pop(); // Lấy phần mở rộng của file
                save(null, `${uniqueSuffix}.${ext}`); // Lưu file với tên duy nhất
            },
        });
    };

    handleFileUpload(file: Express.Multer.File) {
        return { message: 'File uploaded successfully', filename: file.filename };
    };
}