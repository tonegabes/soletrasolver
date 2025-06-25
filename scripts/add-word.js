const fs = require("fs");
const path = require("path");
const readline = require("readline");

/**
 * Script para adicionar novas palavras ao dicionário
 */
class WordManager {
  constructor() {
    this.publicDir = path.join(__dirname, "..", "public");
    this.dicionarioPath = path.join(this.publicDir, "dicionario.txt");
    this.backupPath = path.join(this.publicDir, "dicionario_backup.txt");
  }

  /**
   * Valida se uma palavra é válida para o dicionário
   */
  validateWord(palavra) {
    // Remove espaços e converte para minúscula
    palavra = palavra.trim().toLowerCase();

    // Verifica se não está vazia
    if (!palavra) {
      return { valid: false, error: "Palavra não pode estar vazia" };
    }

    // Verifica se tem pelo menos 2 caracteres
    if (palavra.length < 2) {
      return {
        valid: false,
        error: "Palavra deve ter pelo menos 2 caracteres",
      };
    }

    // Verifica se contém apenas caracteres válidos (letras portuguesas e hífen)
    if (!/^[a-záéíóúâêîôûãõç-]+$/i.test(palavra)) {
      return { valid: false, error: "Palavra contém caracteres inválidos" };
    }

    // Verifica se não começa ou termina com hífen
    if (palavra.startsWith("-") || palavra.endsWith("-")) {
      return {
        valid: false,
        error: "Palavra não pode começar ou terminar com hífen",
      };
    }

    return { valid: true, word: palavra };
  }

  /**
   * Carrega o dicionário atual
   */
  loadDictionary() {
    if (!fs.existsSync(this.dicionarioPath)) {
      console.error("❌ Arquivo dicionario.txt não encontrado");
      return null;
    }

    const content = fs.readFileSync(this.dicionarioPath, "utf8");
    return content
      .split(/[\n\r]+/)
      .map((palavra) => palavra.trim().toLowerCase())
      .filter((palavra) => palavra.length > 0)
      .filter((palavra) => !palavra.startsWith("#"));
  }

  /**
   * Salva o dicionário com backup automático
   */
  saveDictionary(palavras) {
    try {
      // Criar backup do arquivo atual
      if (fs.existsSync(this.dicionarioPath)) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const backupFileName = `dicionario_backup_${timestamp}.txt`;
        const backupPath = path.join(this.publicDir, backupFileName);
        fs.copyFileSync(this.dicionarioPath, backupPath);
        console.log(`📁 Backup criado: ${backupFileName}`);
      }

      // Ordenar e remover duplicatas
      const palavrasUnicas = [...new Set(palavras)].sort();

      // Salvar novo dicionário
      const content = palavrasUnicas.join("\n");
      fs.writeFileSync(this.dicionarioPath, content, "utf8");

      console.log(
        `✅ Dicionário atualizado com ${palavrasUnicas.length} palavras`
      );
      return true;
    } catch (error) {
      console.error("❌ Erro ao salvar dicionário:", error.message);
      return false;
    }
  }

  /**
   * Adiciona uma palavra ao dicionário
   */
  async addWord(palavra) {
    // Validar palavra
    const validation = this.validateWord(palavra);
    if (!validation.valid) {
      console.error(`❌ ${validation.error}: "${palavra}"`);
      return false;
    }

    const palavraLimpa = validation.word;

    // Carregar dicionário atual
    const palavras = this.loadDictionary();
    if (!palavras) return false;

    // Verificar se já existe
    if (palavras.includes(palavraLimpa)) {
      console.warn(`⚠️  Palavra "${palavraLimpa}" já existe no dicionário`);
      return false;
    }

    // Adicionar nova palavra
    palavras.push(palavraLimpa);

    // Salvar dicionário
    const saved = this.saveDictionary(palavras);
    if (saved) {
      console.log(`✅ Palavra "${palavraLimpa}" adicionada com sucesso!`);
      return true;
    }

    return false;
  }

  /**
   * Adiciona múltiplas palavras de uma vez
   */
  async addMultipleWords(palavras) {
    const dicionario = this.loadDictionary();
    if (!dicionario) return false;

    let adicionadas = 0;
    let rejeitadas = 0;
    const novasPalavras = [...dicionario];

    console.log(`📝 Processando ${palavras.length} palavras...`);

    for (const palavra of palavras) {
      const validation = this.validateWord(palavra);

      if (!validation.valid) {
        console.warn(`❌ Rejeitada "${palavra}": ${validation.error}`);
        rejeitadas++;
        continue;
      }

      const palavraLimpa = validation.word;

      if (novasPalavras.includes(palavraLimpa)) {
        console.warn(`⚠️  Palavra "${palavraLimpa}" já existe`);
        rejeitadas++;
        continue;
      }

      novasPalavras.push(palavraLimpa);
      adicionadas++;
      console.log(`✅ Adicionada: "${palavraLimpa}"`);
    }

    if (adicionadas > 0) {
      const saved = this.saveDictionary(novasPalavras);
      if (saved) {
        console.log(`\n🎉 Resumo:`);
        console.log(`   • ${adicionadas} palavras adicionadas`);
        console.log(`   • ${rejeitadas} palavras rejeitadas`);
        console.log(`   • Total no dicionário: ${novasPalavras.length}`);
        return true;
      }
    } else {
      console.log("ℹ️  Nenhuma palavra nova foi adicionada");
    }

    return false;
  }

  /**
   * Interface interativa para adicionar palavras
   */
  async interactiveMode() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("🔤 Modo interativo - Adicionar palavras ao dicionário");
    console.log('💡 Digite uma palavra por linha, ou "sair" para terminar');
    console.log('💡 Digite "arquivo <caminho>" para importar de um arquivo');
    console.log("───────────────────────────────────────────────────────");

    const askForWord = () => {
      rl.question("📝 Palavra: ", async (input) => {
        input = input.trim();

        if (input.toLowerCase() === "sair") {
          console.log("👋 Encerrando...");
          rl.close();
          return;
        }

        if (input.startsWith("arquivo ")) {
          const filePath = input.substring(8).trim();
          await this.importFromFile(filePath);
          askForWord();
          return;
        }

        if (input) {
          await this.addWord(input);
        }

        askForWord();
      });
    };

    askForWord();
  }

  /**
   * Importa palavras de um arquivo
   */
  async importFromFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Arquivo não encontrado: ${filePath}`);
        return;
      }

      const content = fs.readFileSync(filePath, "utf8");
      const palavras = content
        .split(/[\n\r,;]+/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      if (palavras.length === 0) {
        console.warn("⚠️  Nenhuma palavra encontrada no arquivo");
        return;
      }

      console.log(`📁 Importando ${palavras.length} palavras de: ${filePath}`);
      await this.addMultipleWords(palavras);
    } catch (error) {
      console.error(`❌ Erro ao ler arquivo: ${error.message}`);
    }
  }

  /**
   * Exibe estatísticas do dicionário
   */
  showStats() {
    const palavras = this.loadDictionary();
    if (!palavras) return;

    const stats = {
      total: palavras.length,
      porTamanho: {},
      primeiraLetra: {},
    };

    palavras.forEach((palavra) => {
      // Contagem por tamanho
      const tamanho = palavra.length;
      stats.porTamanho[tamanho] = (stats.porTamanho[tamanho] || 0) + 1;

      // Contagem por primeira letra
      const primeira = palavra[0].toUpperCase();
      stats.primeiraLetra[primeira] = (stats.primeiraLetra[primeira] || 0) + 1;
    });

    console.log("📊 Estatísticas do Dicionário");
    console.log("─────────────────────────────");
    console.log(`📖 Total de palavras: ${stats.total.toLocaleString()}`);

    console.log("\n🔢 Por tamanho:");
    Object.entries(stats.porTamanho)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .slice(0, 10)
      .forEach(([tamanho, count]) => {
        const percentage = ((count / stats.total) * 100).toFixed(1);
        console.log(
          `   ${tamanho} letras: ${count.toLocaleString()} (${percentage}%)`
        );
      });

    console.log("\n🔤 Por primeira letra (top 10):");
    Object.entries(stats.primeiraLetra)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .forEach(([letra, count]) => {
        const percentage = ((count / stats.total) * 100).toFixed(1);
        console.log(`   ${letra}: ${count.toLocaleString()} (${percentage}%)`);
      });
  }
}

// Função principal
async function main() {
  const args = process.argv.slice(2);
  const manager = new WordManager();

  if (args.length === 0) {
    // Modo interativo
    await manager.interactiveMode();
    return;
  }

  const command = args[0].toLowerCase();

  switch (command) {
    case "add":
    case "adicionar":
      if (args.length < 2) {
        console.error("❌ Uso: npm run add-word add <palavra>");
        process.exit(1);
      }
      await manager.addWord(args[1]);
      break;

    case "import":
    case "importar":
      if (args.length < 2) {
        console.error("❌ Uso: npm run add-word import <arquivo>");
        process.exit(1);
      }
      await manager.importFromFile(args[1]);
      break;

    case "stats":
    case "estatisticas":
      manager.showStats();
      break;

    case "help":
    case "ajuda":
      console.log("🔤 Script para gerenciar palavras do dicionário");
      console.log("");
      console.log("📝 Comandos disponíveis:");
      console.log("   npm run add-word                    # Modo interativo");
      console.log(
        "   npm run add-word add <palavra>      # Adicionar uma palavra"
      );
      console.log(
        "   npm run add-word import <arquivo>   # Importar de arquivo"
      );
      console.log(
        "   npm run add-word stats              # Mostrar estatísticas"
      );
      console.log(
        "   npm run add-word help               # Mostrar esta ajuda"
      );
      console.log("");
      console.log("💡 Exemplos:");
      console.log('   npm run add-word add "programação"');
      console.log("   npm run add-word import palavras.txt");
      break;

    default:
      console.error(`❌ Comando desconhecido: ${command}`);
      console.log(
        '💡 Use "npm run add-word help" para ver os comandos disponíveis'
      );
      process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch((error) => {
    console.error("❌ Erro inesperado:", error.message);
    process.exit(1);
  });
}

module.exports = { WordManager };
