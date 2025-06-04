import { DOMParser, XMLSerializer } from "@xmldom/xmldom";
import { IZipProcessor } from "../interfaces/IZipProcessor"; // ajuste o caminho conforme sua estrutura
import { PlaceholderReplacer } from "./PlaceholderReplacer";

export class TemplateDataBinder {
  constructor(private zipProcessor: IZipProcessor) {}

  async bind(data: Record<string, string>): Promise<void> {
    const zip = await this.zipProcessor.getZip(); 
    const filePath = "word/document.xml";

    const xmlString = await zip.file(filePath)?.async("string");

    if (!xmlString) {
      throw new Error("File document.xml not found in the zip archive.");
    }

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    const replacer = new PlaceholderReplacer(xmlDoc);
    replacer.replacePlaceholders(data);

    const updatedXml = new XMLSerializer().serializeToString(replacer.getUpdatedDocument());
    zip.file(filePath, updatedXml);
  }
}