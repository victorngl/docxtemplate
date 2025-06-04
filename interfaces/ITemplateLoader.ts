interface ITemplateLoader {
    loadTemplate(path: string): Promise<Buffer>;
}