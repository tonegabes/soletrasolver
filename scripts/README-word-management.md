# 🔤 Gerenciamento de Palavras - Guia Completo

Este guia detalha como usar o sistema de gerenciamento de palavras do Soletra Solver.

## 🚀 Scripts Disponíveis

### 1. **Modo Interativo**
```bash
npm run add-word
```
Inicia uma sessão interativa onde você pode adicionar palavras uma por vez.

### 2. **Adicionar Palavra Única**
```bash
npm run add-word add "palavra"
npm run dict:add "palavra"
```
Adiciona uma palavra específica diretamente.

### 3. **Importar de Arquivo**
```bash
npm run add-word import caminho/arquivo.txt
npm run dict:import caminho/arquivo.txt
```
Importa palavras de um arquivo de texto.

### 4. **Estatísticas do Dicionário**
```bash
npm run add-word stats
npm run dict:stats
```
Mostra estatísticas detalhadas do dicionário atual.

### 5. **Ajuda**
```bash
npm run add-word help
```
Exibe informações de uso dos comandos.

## 📝 Exemplos Práticos

### Exemplo 1: Adicionar uma palavra
```bash
$ npm run add-word add "programação"
📁 Backup criado: dicionario_backup_2025-06-25T02-36-52-402Z.txt
✅ Dicionário atualizado com 540720 palavras
✅ Palavra "programação" adicionada com sucesso!
```

### Exemplo 2: Modo interativo
```bash
$ npm run add-word
🔤 Modo interativo - Adicionar palavras ao dicionário
💡 Digite uma palavra por linha, ou "sair" para terminar
💡 Digite "arquivo <caminho>" para importar de um arquivo
───────────────────────────────────────────────────────
📝 Palavra: javascript
✅ Palavra "javascript" adicionada com sucesso!
📝 Palavra: typescript
✅ Palavra "typescript" adicionada com sucesso!
📝 Palavra: arquivo scripts/example-words.txt
📁 Importando 20 palavras de: scripts/example-words.txt
...
📝 Palavra: sair
👋 Encerrando...
```

### Exemplo 3: Importar de arquivo
```bash
$ npm run add-word import scripts/example-words.txt
📁 Importando 20 palavras de: scripts/example-words.txt
📝 Processando 20 palavras...
✅ Adicionada: "frontend"
✅ Adicionada: "backend"
⚠️  Palavra "código" já existe
✅ Adicionada: "deployment"
...
🎉 Resumo:
   • 13 palavras adicionadas
   • 7 palavras rejeitadas
   • Total no dicionário: 540733
```

### Exemplo 4: Estatísticas
```bash
$ npm run dict:stats
📊 Estatísticas do Dicionário
─────────────────────────────
📖 Total de palavras: 541.771

🔢 Por tamanho:
   5 letras: 14.014 (2.6%)
   6 letras: 28.239 (5.2%)
   7 letras: 45.780 (8.5%)
   8 letras: 63.472 (11.7%)
   9 letras: 74.649 (13.8%)
   10 letras: 77.054 (14.2%)

🔤 Por primeira letra (top 10):
   A: 64.963 (12.0%)
   C: 62.110 (11.5%)
   E: 52.934 (9.8%)
   P: 48.363 (8.9%)
   M: 34.983 (6.5%)
```

## 📄 Formatos de Arquivo Suportados

O script aceita arquivos de texto com palavras separadas por:
- **Quebras de linha** (`\n`)
- **Vírgulas** (`,`)
- **Ponto e vírgula** (`;`)

### Exemplo de arquivo `palavras-tech.txt`:
```
programação
javascript, typescript
react; nextjs; vue
desenvolvimento
frontend
backend
fullstack
```

### Exemplo de arquivo `palavras-design.txt`:
```
interface
usabilidade
acessibilidade
responsivo
prototipagem
wireframe
mockup
```

## ✅ Validações Automáticas

### ✅ **Caracteres Válidos**
- Aceita apenas letras portuguesas: `a-z`, `á`, `é`, `í`, `ó`, `ú`, `â`, `ê`, `î`, `ô`, `û`, `ã`, `õ`, `ç`
- Permite hífens no meio da palavra
- Converte automaticamente para minúsculas

### ✅ **Regras de Validação**
- Mínimo de 2 caracteres
- Não pode estar vazia
- Não pode começar ou terminar com hífen
- Remove espaços extras automaticamente

### ❌ **Exemplos de palavras rejeitadas:**
```bash
""           # ❌ Palavra vazia
"a"          # ❌ Muito curta (< 2 caracteres)
"hello"      # ❌ Contém caracteres não portugueses
"-palavra"   # ❌ Começa com hífen
"palavra-"   # ❌ Termina com hífen
"word123"    # ❌ Contém números
"café@home"  # ❌ Contém símbolos especiais
```

### ✅ **Exemplos de palavras aceitas:**
```bash
"programação"    # ✅ Acentos portugueses
"full-stack"     # ✅ Hífen no meio
"joão"           # ✅ Caracteres especiais portugueses
"são-paulo"      # ✅ Múltiplos hífens válidos
"açúcar"         # ✅ Cedilha e acentos
```

## 🛡️ Recursos de Segurança

### 🔄 **Backup Automático**
- Cria backup antes de cada modificação
- Nome com timestamp: `dicionario_backup_2025-06-25T02-36-52-402Z.txt`
- Preserva histórico de todas as mudanças

### 🔍 **Detecção de Duplicatas**
- Verifica se a palavra já existe antes de adicionar
- Evita duplicação automática
- Mostra aviso para palavras já existentes

### 📋 **Organização Automática**
- Ordena alfabeticamente após cada adição
- Remove duplicatas automaticamente
- Mantém formatação consistente

## 🔧 Estrutura Técnica

### Arquivos Envolvidos
```
soletra-app/
├── scripts/
│   ├── add-word.js              # Script principal
│   ├── example-words.txt        # Exemplo de import
│   └── README-word-management.md # Esta documentação
├── public/
│   ├── dicionario.txt           # Dicionário principal
│   ├── dicionario_backup.txt    # Backup padrão
│   └── dicionario_backup_*.txt  # Backups automáticos
└── package.json                 # Scripts npm
```

### Classes e Métodos
```javascript
class WordManager {
  validateWord(palavra)           // Valida formato da palavra
  loadDictionary()               // Carrega dicionário atual
  saveDictionary(palavras)       // Salva com backup automático
  addWord(palavra)               // Adiciona palavra única
  addMultipleWords(palavras)     // Adiciona múltiplas palavras
  interactiveMode()              // Modo interativo
  importFromFile(filePath)       // Importa de arquivo
  showStats()                    // Exibe estatísticas
}
```

## 🚀 Fluxo de Trabalho Recomendado

### Para Desenvolvimento
1. **Adicione palavras específicas:**
   ```bash
   npm run dict:add "nova-palavra"
   ```

2. **Use modo interativo para várias palavras:**
   ```bash
   npm run add-word
   ```

3. **Importe listas grandes de arquivo:**
   ```bash
   npm run dict:import lista-palavras.txt
   ```

### Para Produção
1. **Teste adições localmente**
2. **Verifique estatísticas:**
   ```bash
   npm run dict:stats
   ```
3. **Rebuild com novas palavras:**
   ```bash
   npm run build:compress
   ```
4. **Deploy:**
   ```bash
   npm run deploy
   ```

## 📊 Benefícios do Sistema

### ✅ **Facilidade de Uso**
- Interface amigável no terminal
- Comandos intuitivos
- Feedback claro sobre ações

### ✅ **Robustez**
- Validação rigorosa
- Backups automáticos
- Detecção de erros

### ✅ **Eficiência**
- Import em lote
- Processamento rápido
- Organização automática

### ✅ **Transparência**
- Logs detalhados
- Estatísticas completas
- Histórico de mudanças

---

**💡 Dica:** Use `npm run add-word help` a qualquer momento para ver os comandos disponíveis!
