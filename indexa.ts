
import JSZip from "jszip";
import fs from "fs";
class Docxtemplater {

        private jszip: JSZip;
        private templatePath: string;
        private fs; 

        
        constructor(templatePath: string) {
        this.templatePath = templatePath;
        this.jszip = new JSZip();
        this.fs = fs;
    }

}