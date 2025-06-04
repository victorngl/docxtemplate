import JSZip from "jszip";
import { FileTemplateLoader } from "../loaders/FileTemplateLoader";
import { JSZipProcessor } from "../processors/JSZipProcessor";
import { TemplateDataBinder } from "./TemplateDataBinder";
import { ITemplater } from "../interfaces/ITemplater";

export class DocxTemplater implements ITemplater {
  private loader: FileTemplateLoader;
  private zipProcessor: JSZipProcessor;

  constructor(private templatePath: string) {
    this.loader = new FileTemplateLoader();
    this.zipProcessor = new JSZipProcessor(new JSZip());
  }

  async render(data: Record<string, any>): Promise<Buffer> {
    const templateBuffer = await this.loader.loadTemplate(this.templatePath);

    await this.zipProcessor.load(templateBuffer);

    const binder = new TemplateDataBinder(this.zipProcessor);
    await binder.bind(data);

    const zip = await this.zipProcessor.getZip();
    const finalBuffer = await zip.generateAsync({ type: "nodebuffer" });

    return finalBuffer;
  }
  
}
