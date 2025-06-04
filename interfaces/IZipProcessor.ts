interface IZipProcessor {
    load(buffer: Buffer): Promise<void>;
    getContent(): Promise<any>; // Exemplo
}