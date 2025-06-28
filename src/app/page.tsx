'use client';

import { AlertCircle, BookOpen, Filter, HelpCircle, Search, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SearchParams {
  letrasPermitidas: string;
  letraObrigatoria: string;
  quantidadeLetras: number;
}

export default function Home() {
  const [dicionario, setDicionario] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    letrasPermitidas: '',
    letraObrigatoria: '',
    quantidadeLetras: 5
  });
  const [resultados, setResultados] = useState<string[]>([]);
  const [searching, setSearching] = useState(false);

  // Carregar o dicionário
  useEffect(() => {
    const carregarDicionario = async () => {
      try {
        setLoading(true);
        console.log('Carregando dicionário...');

        // First, try to load chunked dictionary
        try {
          const chunkedDict = await loadChunkedDictionary();
          if (chunkedDict.length > 0) {
            setDicionario(chunkedDict);
            console.log(`Dicionário em chunks carregado: ${chunkedDict.length} palavras`);
            return;
          }
        } catch {
          console.log('Chunks não disponíveis, tentando arquivo único...');
        }

        // Try multiple possible paths due to deployment configuration
        const possiblePaths = [
          '/dicionario.txt',
          `${process.env.NODE_ENV === 'production' ? '/soletrasolver' : ''}/dicionario.txt`,
          './dicionario.txt'
        ];

        let response = null;

        for (const path of possiblePaths) {
          try {
            console.log(`Tentando carregar: ${path}`);
            response = await fetch(path);
            if (response.ok) {
              console.log(`Sucesso ao carregar: ${path}`);
              break;
            }
          } catch (pathError) {
            console.warn(`Erro ao carregar ${path}:`, pathError);
            continue;
          }
        }

        if (!response || !response.ok) {
          throw new Error(`Falha ao carregar dicionário. Status: ${response?.status || 'unknown'}`);
        }

        // Check if the response is actually text
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);
        console.log('Response size:', response.headers.get('content-length'));

        const text = await response.text();
        console.log('Texto carregado, tamanho:', text.length);

        if (text.length < 100) {
          console.error('Arquivo muito pequeno, possível erro:', text);
          throw new Error('Arquivo de dicionário parece estar truncado ou corrompido');
        }

        // Process the text with better splitting logic
        const palavras = text
          .split(/[\n\r]+/)
          .map(palavra => palavra.trim())
          .filter(palavra => palavra.length > 0 && !palavra.startsWith('#'))
          .filter(palavra => /^[a-záéíóúâêîôûãõç-]+$/i.test(palavra)); // Only valid Portuguese words

        console.log(`Palavras processadas: ${palavras.length}`);

        if (palavras.length < 1000) {
          console.warn('Número suspeito de palavras carregadas:', palavras.length);
          console.log('Primeiras 10 palavras:', palavras.slice(0, 10));
        }

        setDicionario(palavras);

      } catch (error) {
        console.error('Erro ao carregar dicionário:', error);

        // Fallback: try to load a smaller backup dictionary
        try {
          console.log('Tentando carregar dicionário de backup...');
          const backupResponse = await fetch('/dicionario_backup.txt');
          if (backupResponse.ok) {
            const backupText = await backupResponse.text();
            const palavrasBackup = backupText
              .split(/[\n\r]+/)
              .map(palavra => palavra.trim())
              .filter(palavra => palavra.length > 0);

            setDicionario(palavrasBackup);
            console.log(`Dicionário de backup carregado: ${palavrasBackup.length} palavras`);
          } else {
            throw new Error('Backup também falhou');
          }
        } catch (backupError) {
          console.error('Falha no backup:', backupError);
          alert('Erro ao carregar dicionário. Por favor, recarregue a página.');
        }
      } finally {
        setLoading(false);
      }
    };

    carregarDicionario();
  }, []);

  // Function to load chunked dictionary
  const loadChunkedDictionary = async (): Promise<string[]> => {
    const basePath = process.env.NODE_ENV === 'production' ? '/soletrasolver' : '';

    // Try to load the index file
    const indexResponse = await fetch(`${basePath}/dicionario-index.json`);
    if (!indexResponse.ok) {
      throw new Error('Índice de chunks não encontrado');
    }

    const index = await indexResponse.json();
    console.log(`Carregando ${index.chunks} chunks...`);

    const allWords: string[] = [];

    // Load all chunks in parallel for better performance
    const chunkPromises = [];
    for (let i = 0; i < index.chunks; i++) {
      chunkPromises.push(
        fetch(`${basePath}/dicionario-chunk-${i}.txt`)
          .then(response => response.text())
          .then(text => text.split(/[\n\r]+/).map(palavra => palavra.trim()).filter(palavra => palavra.length > 0))
      );
    }

    const chunks = await Promise.all(chunkPromises);
    chunks.forEach(chunk => allWords.push(...chunk));

    return allWords;
  };

  // Algoritmo de busca
  const buscarPalavras = () => {
    if (!searchParams.letrasPermitidas || !searchParams.letraObrigatoria) {
      alert('Por favor, preencha as letras permitidas e a letra obrigatória');
      return;
    }

    setSearching(true);

    // Normalizar inputs
    const letrasPermitidas = searchParams.letrasPermitidas.toLowerCase().replace(/\s/g, '');
    const letraObrigatoria = searchParams.letraObrigatoria.toLowerCase().trim();
    const quantidadeLetras = searchParams.quantidadeLetras;

    // Verificar se a letra obrigatória está nas letras permitidas
    if (!letrasPermitidas.includes(letraObrigatoria)) {
      alert('A letra obrigatória deve estar presente nas letras permitidas');
      setSearching(false);
      return;
    }

    const palavrasEncontradas = dicionario.filter(palavra => {
      const palavraNormalizada = palavra.toLowerCase();

      // Verificar se a palavra tem o tamanho correto
      if (palavraNormalizada.length !== quantidadeLetras) {
        return false;
      }

      // Verificar se contém a letra obrigatória
      if (!palavraNormalizada.includes(letraObrigatoria)) {
        return false;
      }

      // Verificar se todas as letras da palavra estão nas letras permitidas
      for (const letra of palavraNormalizada) {
        if (!letrasPermitidas.includes(letra)) {
          return false;
        }
      }

      return true;
    });

    setResultados(palavrasEncontradas);
    setSearching(false);
  };

  const limparResultados = () => {
    setResultados([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Carregando dicionário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header with SEO-optimized structure */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-indigo-600 mr-3" aria-hidden="true" />
            <h1 className="text-4xl font-bold text-gray-800">Soletra</h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            Encontre palavras do dicionário português com base em letras específicas
          </p>
          <p className="text-sm text-gray-500">
            Ferramenta gratuita com {dicionario.length.toLocaleString()} palavras carregadas
          </p>

          {/* SEO-friendly breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="mt-4">
            <ol className="flex justify-center space-x-2 text-sm text-gray-500">
              <li>
                <span className="font-medium text-indigo-600">Busca de Palavras</span>
              </li>
              <li className="before:content-['>'] before:mx-2">Português</li>
            </ol>
          </nav>
        </header>

        {/* Main search form with semantic HTML */}
        <main>
          <section aria-labelledby="search-heading">
            <h2 id="search-heading" className="sr-only">Formulário de Busca de Palavras</h2>

            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
              <form onSubmit={(e) => { e.preventDefault(); buscarPalavras(); }} role="search">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="letras-permitidas" className="block text-sm font-medium text-gray-700 mb-2">
                      Letras Permitidas
                    </label>
                    <input
                      id="letras-permitidas"
                      type="text"
                      value={searchParams.letrasPermitidas}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, letrasPermitidas: e.target.value }))}
                      placeholder="Ex: abcdefg"
                      aria-describedby="letras-permitidas-help"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                    <p id="letras-permitidas-help" className="text-xs text-gray-500 mt-1">
                      Digite todas as letras que podem ser usadas
                    </p>
                  </div>

                  <div>
                    <label htmlFor="letra-obrigatoria" className="block text-sm font-medium text-gray-700 mb-2">
                      Letra Obrigatória
                    </label>
                    <input
                      id="letra-obrigatoria"
                      type="text"
                      value={searchParams.letraObrigatoria}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, letraObrigatoria: e.target.value.slice(0, 1) }))}
                      placeholder="Ex: a"
                      maxLength={1}
                      aria-describedby="letra-obrigatoria-help"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                    <p id="letra-obrigatoria-help" className="text-xs text-gray-500 mt-1">
                      Uma letra que deve aparecer na palavra
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="quantidade-letras" className="block text-sm font-medium text-gray-700 mb-2">
                      Quantidade de Letras
                    </label>
                    <input
                      id="quantidade-letras"
                      type="number"
                      value={searchParams.quantidadeLetras}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, quantidadeLetras: parseInt(e.target.value) || 5 }))}
                      min="1"
                      max="20"
                      aria-describedby="quantidade-letras-help"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                    />
                    <p id="quantidade-letras-help" className="text-xs text-gray-500 mt-1">
                      Tamanho exato das palavras a serem encontradas
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    disabled={searching}
                    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    aria-describedby="buscar-ajuda"
                  >
                    {searching ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" aria-hidden="true"></div>
                        Buscando...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" aria-hidden="true" />
                        Buscar Palavras
                      </>
                    )}
                  </button>

                  {resultados.length > 0 && (
                    <button
                      type="button"
                      onClick={limparResultados}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Limpar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>

          {/* Results section with semantic structure */}
          {resultados.length > 0 && (
            <section aria-labelledby="resultados-heading">
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Filter className="h-5 w-5 text-indigo-600 mr-2" aria-hidden="true" />
                  <h2 id="resultados-heading" className="text-xl font-semibold text-gray-800">
                    Resultados ({resultados.length} palavras encontradas)
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2" aria-label="Lista de palavras encontradas">
                  {resultados.map((palavra, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-center hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-800">
                        {palavra}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Instructions section for SEO content */}
          <section aria-labelledby="instrucoes-heading" className="max-w-2xl mx-auto mt-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-amber-800">
                  <h3 id="instrucoes-heading" className="font-medium mb-1">Como usar o Soletra:</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Digite todas as letras que podem ser usadas nas palavras</li>
                    <li>Escolha uma letra que DEVE aparecer em todas as palavras encontradas</li>
                    <li>Defina o número exato de letras que as palavras devem ter</li>
                    <li>A letra obrigatória deve estar presente nas letras permitidas</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Content Section */}
          <section aria-labelledby="sobre-ferramenta" className="max-w-4xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 id="sobre-ferramenta" className="text-2xl font-bold text-gray-800 mb-6">
              Sobre o Soletra - Sua Ferramenta de Busca de Palavras
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" aria-hidden="true" />
                  Por que usar o Soletra?
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Mais de 100.000 palavras</strong> em português brasileiro</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Gratuito e sem cadastro</strong> - Use quando quiser</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Interface responsiva</strong> - Funciona em qualquer dispositivo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Busca rápida</strong> com filtros avançados</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <HelpCircle className="h-5 w-5 text-blue-500 mr-2" aria-hidden="true" />
                  Casos de uso populares
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Spelling Bee em português</strong> - Encontre palavras com letras específicas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Palavras cruzadas</strong> - Complete suas grades com facilidade</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Jogos de palavras</strong> - Scrabble, Letreco e similares</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Estudos linguísticos</strong> - Pesquisa e análise de vocabulário</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-2">Dica profissional:</h4>
              <p className="text-sm text-indigo-700">
                Use o Soletra para resolver desafios do <strong>Spelling Bee do The New York Times em português</strong>,
                encontrar palavras para <strong>palavras cruzadas</strong>, ou melhorar seu desempenho em
                <strong> jogos como Scrabble e Letreco</strong>. Nossa base de dados inclui palavras
                comuns e raras da língua portuguesa.
              </p>
            </div>
          </section>
        </main>

                  {/* Navigation Links */}
          <section className="mt-12 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Explore Mais</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/sobre"
                className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="text-center">
                  <BookOpen className="h-8 w-8 text-indigo-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600">Sobre o Soletra</h3>
                  <p className="text-sm text-gray-600 mt-1">Conheça nossa ferramenta e tecnologia</p>
                </div>
              </Link>

              <Link
                href="/como-usar"
                className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="text-center">
                  <HelpCircle className="h-8 w-8 text-indigo-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600">Como Usar</h3>
                  <p className="text-sm text-gray-600 mt-1">Tutorial completo com exemplos práticos</p>
                </div>
              </Link>

              <Link
                href="/jogos-palavras"
                className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="text-center">
                  <Star className="h-8 w-8 text-indigo-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600">Jogos de Palavras</h3>
                  <p className="text-sm text-gray-600 mt-1">Spelling Bee, Scrabble, Letreco e mais</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Footer with structured data */}
          <footer className="mt-16 text-center text-gray-500 text-sm">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-8 text-left">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Soletra</h4>
                  <ul className="space-y-2">
                    <li><Link href="/sobre" className="hover:text-indigo-600 transition-colors">Sobre</Link></li>
                    <li><Link href="/como-usar" className="hover:text-indigo-600 transition-colors">Como Usar</Link></li>
                    <li><Link href="/jogos-palavras" className="hover:text-indigo-600 transition-colors">Jogos de Palavras</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Jogos Populares</h4>
                  <ul className="space-y-2">
                    <li><span className="text-gray-600">Spelling Bee</span></li>
                    <li><span className="text-gray-600">Scrabble</span></li>
                    <li><span className="text-gray-600">Letreco (Wordle)</span></li>
                    <li><span className="text-gray-600">Palavras Cruzadas</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Características</h4>
                  <ul className="space-y-2">
                    <li><span className="text-gray-600">100.000+ palavras</span></li>
                    <li><span className="text-gray-600">Gratuito</span></li>
                    <li><span className="text-gray-600">Sem cadastro</span></li>
                    <li><span className="text-gray-600">Interface responsiva</span></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 text-center">
                <p>
                  © 2024 Soletra - Ferramenta gratuita de busca de palavras em português
                </p>
                <p className="mt-2 text-xs">
                  Português Brasileiro • Dicionário com mais de 100.000 palavras •
                  Ideal para Spelling Bee, Scrabble, Letreco e palavras cruzadas
                </p>
              </div>
            </div>
          </footer>
      </div>
    </div>
  );
}
