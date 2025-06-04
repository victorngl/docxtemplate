import JSZip from 'jszip';
import { IZipProcessor } from '../interfaces/IZipProcessor';

export class JSZipProcessor implements IZipProcessor {
    private zip: JSZip;
  
    constructor(zip: JSZip) {
      this.zip = zip;
    }
  
    async load(buffer: Buffer): Promise<void> {
      await this.zip.loadAsync(buffer);
    }
  
    async getContent(): Promise<any> {
      return this.zip.files;
    }
  
    async getZip(): Promise<JSZip> {
      return this.zip;
    }
  }