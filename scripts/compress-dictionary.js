const fs = require("fs");
const path = require("path");

/**
 * Script para otimizar o dicionário para produção
 */
async function compressDictionary() {
  const publicDir = path.join(__dirname, "..", "public");
  const outDir = path.join(__dirname, "..", "out");
  const dicionarioPath = path.join(publicDir, "dicionario.txt");
  const outputPath = path.join(outDir, "dicionario.txt");

  try {
    console.log("🔄 Comprimindo dicionário...");

    // Verificar se o arquivo existe
    if (!fs.existsSync(dicionarioPath)) {
      console.error(
        "❌ Arquivo dicionario.txt não encontrado em:",
        dicionarioPath
      );
      return;
    }

    // Ler o arquivo original
    const originalContent = fs.readFileSync(dicionarioPath, "utf8");
    console.log(
      `📊 Tamanho original: ${(originalContent.length / 1024 / 1024).toFixed(
        2
      )} MB`
    );

    // Processar e limpar as palavras
    const palavras = originalContent
      .split(/[\n\r]+/)
      .map((palavra) => palavra.trim())
      .filter((palavra) => palavra.length > 0)
      .filter((palavra) => !palavra.startsWith("#"))
      .filter((palavra) => /^[a-záéíóúâêîôûãõç-]+$/i.test(palavra))
      .filter((palavra, index, array) => array.indexOf(palavra) === index) // Remove duplicatas
      .sort();

    console.log(`📝 Palavras processadas: ${palavras.length}`);

    // Criar versão comprimida
    const compressedContent = palavras.join("\n");

    // Verificar se o diretório out existe
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // Salvar arquivo comprimido
    fs.writeFileSync(outputPath, compressedContent, "utf8");

    const compressedSize = compressedContent.length;
    console.log(
      `📊 Tamanho comprimido: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`
    );
    console.log(
      `💾 Redução: ${(
        ((originalContent.length - compressedSize) / originalContent.length) *
        100
      ).toFixed(1)}%`
    );

    // Se ainda estiver muito grande (>5MB), dividir em chunks
    if (compressedSize > 5 * 1024 * 1024) {
      console.log("⚠️  Arquivo ainda muito grande, dividindo em chunks...");
      await splitDictionary(palavras, outDir);
    }

    console.log("✅ Compressão concluída!");
  } catch (error) {
    console.error("❌ Erro ao comprimir dicionário:", error);
    process.exit(1);
  }
}

async function splitDictionary(palavras, outDir) {
  const chunkSize = 50000; // 50k palavras por chunk
  const chunks = [];

  for (let i = 0; i < palavras.length; i += chunkSize) {
    chunks.push(palavras.slice(i, i + chunkSize));
  }

  console.log(`📦 Criando ${chunks.length} chunks...`);

  // Criar arquivo de índice
  const index = {
    totalWords: palavras.length,
    chunks: chunks.length,
    chunkSize: chunkSize,
  };

  fs.writeFileSync(
    path.join(outDir, "dicionario-index.json"),
    JSON.stringify(index),
    "utf8"
  );

  // Salvar cada chunk
  chunks.forEach((chunk, i) => {
    const chunkContent = chunk.join("\n");
    fs.writeFileSync(
      path.join(outDir, `dicionario-chunk-${i}.txt`),
      chunkContent,
      "utf8"
    );
  });

  console.log(`✅ Dictionary dividido em ${chunks.length} chunks`);
}

// Executar se chamado diretamente
if (require.main === module) {
  compressDictionary();
}

module.exports = { compressDictionary };
