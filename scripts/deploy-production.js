const fs = require("fs");
const path = require("path");

/**
 * Script para verificar e preparar deployment de produção
 */
async function deployProduction() {
  console.log("🚀 Preparando deployment de produção...");

  const outDir = path.join(__dirname, "..", "out");

  // Verificar se o build foi feito
  if (!fs.existsSync(outDir)) {
    console.error(
      "❌ Diretório out não encontrado. Execute npm run build primeiro."
    );
    process.exit(1);
  }

  // Verificar se os chunks existem
  const indexPath = path.join(outDir, "dicionario-index.json");
  if (fs.existsSync(indexPath)) {
    const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
    console.log(
      `✅ Dictionary em chunks: ${index.chunks} arquivos, ${index.totalWords} palavras`
    );

    // Verificar se todos os chunks existem
    let totalSize = 0;
    for (let i = 0; i < index.chunks; i++) {
      const chunkPath = path.join(outDir, `dicionario-chunk-${i}.txt`);
      if (fs.existsSync(chunkPath)) {
        const stats = fs.statSync(chunkPath);
        totalSize += stats.size;
        console.log(`  📄 Chunk ${i}: ${(stats.size / 1024).toFixed(1)} KB`);
      } else {
        console.error(`❌ Chunk ${i} não encontrado`);
        process.exit(1);
      }
    }

    console.log(
      `📊 Tamanho total dos chunks: ${(totalSize / 1024 / 1024).toFixed(2)} MB`
    );
  } else {
    // Verificar dicionário único
    const dictPath = path.join(outDir, "dicionario.txt");
    if (fs.existsSync(dictPath)) {
      const stats = fs.statSync(dictPath);
      console.log(
        `✅ Dicionário único: ${(stats.size / 1024 / 1024).toFixed(2)} MB`
      );

      if (stats.size > 10 * 1024 * 1024) {
        console.warn(
          "⚠️  Arquivo muito grande para alguns serviços de hosting"
        );
      }
    } else {
      console.error("❌ Nenhum arquivo de dicionário encontrado");
      process.exit(1);
    }
  }

  // Verificar outros arquivos importantes
  const htmlPath = path.join(outDir, "index.html");
  if (fs.existsSync(htmlPath)) {
    console.log("✅ index.html gerado");
  } else {
    console.error("❌ index.html não encontrado");
    process.exit(1);
  }

  // Listar todos os arquivos para debug
  console.log("\n📁 Arquivos de deployment:");
  const listFiles = (dir, prefix = "") => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        console.log(`${prefix}📁 ${file}/`);
        if (file !== "_next") {
          // Skip _next directory for cleaner output
          listFiles(filePath, prefix + "  ");
        }
      } else {
        const size =
          stats.size < 1024
            ? `${stats.size}B`
            : stats.size < 1024 * 1024
            ? `${(stats.size / 1024).toFixed(1)}KB`
            : `${(stats.size / 1024 / 1024).toFixed(1)}MB`;
        console.log(`${prefix}📄 ${file} (${size})`);
      }
    });
  };

  listFiles(outDir);

  console.log("\n✅ Preparação de deployment concluída!");
  console.log(
    "🌐 Pronto para deploy no GitHub Pages ou outro serviço de hosting estático"
  );
}

// Executar se chamado diretamente
if (require.main === module) {
  deployProduction();
}

module.exports = { deployProduction };
