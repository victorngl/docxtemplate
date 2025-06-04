const { gerarDocx } = require("./index");

gerarDocx({
  templatePath: "template.docx",
  outputPath: "saida.docx",
  variaveis: {
    nome: "Carlos",
    data: "03/06/2025",
    curso: "Node Avançado"
  }
});