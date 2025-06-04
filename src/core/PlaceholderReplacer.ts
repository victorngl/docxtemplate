import { Document as XmlDocument } from "@xmldom/xmldom";

export class PlaceholderReplacer {
    constructor(private xmlDoc: XmlDocument) { }

    replacePlaceholders(variables: Record<string, string>): void {
        const texts = this.xmlDoc.getElementsByTagName("w:t");

        for (let i = 0; i < texts.length; i++) {
            const node = texts[i];
            const originalText = node.textContent ?? "";

            const newText = this.replaceInText(originalText, variables);

            if (newText !== originalText) {
                node.textContent = newText;
            }
        }
    }

    private replaceInText(text: string, variables: Record<string, string>): string {
        return text.replace(/{{(.*?)}}/g, (_, chave) => {
            const value = variables[chave.trim()];
            return value !== undefined ? value : `{{${chave}}}`;
        });
    }

    getUpdatedDocument(): XmlDocument {
        return this.xmlDoc;
    }
}