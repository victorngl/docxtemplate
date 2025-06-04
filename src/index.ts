import { DocxTemplater } from "./core/DocxTemplater";
import fs from "fs";

const main = async () => {
  const templater = new DocxTemplater("template.docx");

  const data = {
    nome: "Joana",
    curso: "Arquitetura",
    data: "03/06/2025"
  };

  const resultBuffer = await templater.render(data);
  await fs.promises.writeFile("output.docx", resultBuffer);
};

main();