import fs from 'fs';
import { ITemplateLoader } from '../interfaces/ITemplateLoader';

export class FileTemplateLoader implements ITemplateLoader {
    async loadTemplate(path: string): Promise<Buffer> {
        return await fs.promises.readFile(path);
    }
}