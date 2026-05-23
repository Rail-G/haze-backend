import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class MulterService {

    async deleteFiles(imgList: String[]) {
        for (const img of imgList) {
            const filename = img.replace('uploads/', '');
            const path = join(process.cwd(), 'uploads', filename)
            try {
                await fs.unlink(path)
            } catch (err) {
                console.error(`Failed to delete file ${path}:`, err);
            }
        }
    }

    async deleteFile(imgPath: String) {
        const filename = imgPath.replace('uploads/', '');
        const path = join(process.cwd(), 'uploads', filename)
        try {
            await fs.unlink(path)
        } catch (err) {
            console.error(`Failed to delete file ${path}:`, err);
        }
    }
}
