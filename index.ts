import fs from "fs";
import JSZip from "jszip";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";

// Regex para encontrar {{chave}}
const PLACEHOLDER_REGEX = /{{(.*?)}}/g;

function extrairRunsComTexto(doc) {
  const runs: Array<any> = Array.from(doc.getElementsByTagName("w:r"));
  const resultado: Object[] = [];
  let textoCompleto = "";

  for (const run of runs) {
    const tNode = run.getElementsByTagName("w:t")[0];
    if (tNode) {
      const texto = tNode.textContent;
      resultado.push({ run, texto });
      textoCompleto += texto;
    }
  }

  return { textoCompleto, runs: resultado };
}

function substituirPlaceholders(runs, textoCompleto, variaveis) {
  let novoTexto = textoCompleto;

  // Substituições com base nas variáveis
  for (const chave in variaveis) {
    const valor = variaveis[chave];
    novoTexto = novoTexto.replaceAll(`{{${chave}}}`, valor);
  }

  // Limpa todos os runs existentes
  for (const { run } of runs) {
    const t = run.getElementsByTagName("w:t")[0];
    if (t) {
      t.parentNode.removeChild(t);
    }
  }

  // Recria os nós w:t nos runs, de acordo com o novo texto
  let cursor = 0;
  for (const { run, texto } of runs) {
    const novoTrecho = novoTexto.slice(cursor, cursor + texto.length);
    cursor += texto.length;

    const novoT = run.ownerDocument.createElement("w:t");
    const textNode = run.ownerDocument.createTextNode(novoTrecho);
    novoT.appendChild(textNode);
    run.appendChild(novoT);
  }
}

async function gerarDocx({ templatePath, outputPath, variaveis }) {
  const zipData = fs.readFileSync(templatePath);
  const zip = await JSZip.loadAsync(zipData);

  const xmlStr = await zip?.file("word/document.xml")?.async("string");
  if (!xmlStr) {
    throw new Error("Arquivo word/document.xml não encontrado");
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlStr, "text/xml");

  const { textoCompleto, runs } = extrairRunsComTexto(doc);
  substituirPlaceholders(runs, textoCompleto, variaveis);

  const novoXml = new XMLSerializer().serializeToString(doc);
  zip.file("word/document.xml", novoXml);

  const novoDocx = await zip.generateAsync({ type: "nodebuffer" });
  fs.writeFileSync(outputPath, novoDocx);
}

module.exports = { gerarDocx };
