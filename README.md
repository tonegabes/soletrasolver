# Soletra Solver

Um aplicativo Next.js para encontrar palavras do dicionário com base em letras específicas.

## 🚀 Otimizações Implementadas

### Problema Original
- **Apenas 66 palavras carregavam** em produção
- Arquivo de dicionário de **6.25MB** com **541,771 palavras**
- Problemas com limites de tamanho de arquivo em serviços de hosting
- Configuração inadequada para GitHub Pages

### Soluções Implementadas

#### 1. **Carregamento Inteligente de Dicionário**
- ✅ Múltiplos caminhos de fallback para diferentes ambientes
- ✅ Detecção automática de arquivos corrompidos/truncados
- ✅ Sistema de backup automático
- ✅ Logs detalhados para debugging

#### 2. **Divisão Automática em Chunks**
- ✅ Dicionário dividido automaticamente em **11 arquivos** de ~500KB cada
- ✅ Carregamento paralelo de chunks para melhor performance
- ✅ Índice JSON para gerenciamento dos chunks
- ✅ Fallback para arquivo único se chunks não estiverem disponíveis

#### 3. **Otimizações de Build**
- ✅ Compressão e limpeza automática do dicionário
- ✅ Remoção de duplicatas e palavras inválidas
- ✅ Redução do tamanho dos arquivos JavaScript
- ✅ Desabilitação de source maps em produção
- ✅ Cache do webpack otimizado

#### 4. **Scripts de Automação**
- `npm run build:compress` - Build com compressão automática
- `npm run deploy:check` - Verificação pré-deployment
- `npm run deploy` - Deploy completo para GitHub Pages

## 🔤 Gerenciamento de Palavras

### Scripts para Adicionar Palavras

#### **Modo Interativo**
```bash
npm run add-word
```
Interface interativa para adicionar palavras uma por vez.

#### **Adicionar Palavra Única**
```bash
npm run add-word add "programação"
npm run dict:add "javascript"
```

#### **Importar de Arquivo**
```bash
npm run add-word import palavras.txt
npm run dict:import exemplo.txt
```

#### **Estatísticas do Dicionário**
```bash
npm run add-word stats
npm run dict:stats
```

### **Funcionalidades do Gerenciador de Palavras**

#### ✅ **Validação Automática**
- Verifica caracteres válidos (português + hífen)
- Impede palavras vazias ou muito curtas
- Remove espaços e normaliza formato
- Previne hífens no início/fim

#### ✅ **Segurança**
- Backup automático antes de modificações
- Detecção de duplicatas
- Validação de arquivos de import
- Histórico de modificações com timestamp

#### ✅ **Organização**
- Ordenação alfabética automática
- Remoção de duplicatas
- Limpeza de caracteres inválidos
- Estatísticas detalhadas

### **Exemplos de Uso**

#### **1. Adicionar palavras interativamente:**
```bash
$ npm run add-word
🔤 Modo interativo - Adicionar palavras ao dicionário
💡 Digite uma palavra por linha, ou "sair" para terminar
📝 Palavra: programação
✅ Palavra "programação" adicionada com sucesso!
📝 Palavra: sair
👋 Encerrando...
```

#### **2. Importar lista de palavras:**
```bash
$ npm run add-word import scripts/example-words.txt
📁 Importando 20 palavras de: scripts/example-words.txt
✅ Adicionada: "programação"
✅ Adicionada: "javascript"
⚠️  Palavra "código" já existe
...
🎉 Resumo:
   • 18 palavras adicionadas
   • 2 palavras rejeitadas
   • Total no dicionário: 539164
```

#### **3. Ver estatísticas:**
```bash
$ npm run dict:stats
📊 Estatísticas do Dicionário
─────────────────────────────
📖 Total de palavras: 539,146

🔢 Por tamanho:
   3 letras: 1,234 (0.2%)
   4 letras: 5,678 (1.1%)
   5 letras: 12,345 (2.3%)
   ...

🔤 Por primeira letra (top 10):
   A: 45,123 (8.4%)
   C: 42,567 (7.9%)
   ...
```

### **Formato de Arquivo para Import**

O script aceita arquivos de texto com palavras separadas por:
- Quebras de linha
- Vírgulas
- Ponto e vírgula

Exemplo de arquivo `novas-palavras.txt`:
```
programação
javascript, typescript
react; nextjs
desenvolvimento
```

## 📊 Resultados das Otimizações

### Antes
- **66 palavras** carregadas em produção
- Arquivo único de **6.25MB**
- Falhas frequentes de carregamento
- Build instável

### Depois
- **539,146 palavras** carregadas com sucesso
- **11 chunks** de ~500KB cada
- Carregamento robusto com múltiplos fallbacks
- Build otimizado e estável
- **0.4% de redução** no tamanho após limpeza

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção com otimizações
npm run build:compress

# Verificar preparação para deployment
npm run deploy:check

# Deploy completo para GitHub Pages
npm run deploy

# Gerenciamento de palavras
npm run add-word              # Modo interativo
npm run dict:add <palavra>    # Adicionar palavra
npm run dict:import <arquivo> # Importar arquivo
npm run dict:stats            # Estatísticas

# Build simples (sem otimizações)
npm run build
```

## 🔧 Arquitetura da Solução

### Carregamento Progressivo
1. **Tenta carregar chunks** (ideal para produção)
2. **Fallback para arquivo único** (desenvolvimento)
3. **Fallback para backup** (emergência)
4. **Alerta ao usuário** (último recurso)

### Estrutura de Arquivos
```
out/
├── dicionario-index.json       # Índice dos chunks
├── dicionario-chunk-0.txt      # Chunk 1 (50k palavras)
├── dicionario-chunk-1.txt      # Chunk 2 (50k palavras)
├── ...                         # Chunks 3-10
├── dicionario-chunk-10.txt     # Chunk 11 (39k palavras)
├── dicionario.txt              # Arquivo completo (fallback)
└── dicionario_backup.txt       # Backup menor
```

## 🌐 Compatibilidade de Deployment

- ✅ **GitHub Pages** - Otimizado com basePath/assetPrefix
- ✅ **Netlify** - Chunks pequenos passam nos limites
- ✅ **Vercel** - Build otimizado
- ✅ **Cloudflare Pages** - Arquivos < 25MB cada

## 🐛 Debugging

Para debugar problemas de carregamento, abra o console do navegador e procure por:
- Logs de carregamento de chunks
- Informações sobre tamanho de arquivos
- Fallbacks ativados
- Contagem final de palavras

## 📱 Funcionalidades

- Busca por palavras com letras permitidas
- Filtro por letra obrigatória
- Filtro por quantidade de letras
- Interface responsiva e moderna
- Mais de 500 mil palavras do dicionário português
- **Gerenciamento fácil de palavras via linha de comando**

## 🚀 Como Usar

1. Digite as letras que podem ser usadas
2. Escolha uma letra que deve aparecer obrigatoriamente
3. Defina o número de letras da palavra
4. Clique em "Buscar Palavras"

---

Desenvolvido para resolver problemas de carregamento em produção e otimizar a experiência do usuário.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"

2. **Automatic Deployment:**
   - Push your code to the `main` branch
   - The GitHub Action will automatically build and deploy your app
   - Your site will be available at: `https://yourusername.github.io/soletrasolver/`

3. **Manual Deployment (if needed):**
   ```bash
   npm run deploy
   ```

### Configuration:
- The app is configured for static export with GitHub Pages optimization
- Images are unoptimized for static hosting
- Base path is set to `/soletrasolver/` for GitHub Pages subfolder deployment
