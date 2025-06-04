import JSZip from "jszip";

export interface IZipProcessor {
    load(buffer: Buffer): Promise<void>;
    getContent(): Promise<any>; 
    getZip(): Promise<JSZip>;
}