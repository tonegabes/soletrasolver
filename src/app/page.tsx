'use client';

import { AlertCircle, BookOpen, Filter, Search } from 'lucide-react';
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
        const response = await fetch('/dicionario.txt');
        const text = await response.text();
        const palavras = text.split('\n').map(palavra => palavra.trim()).filter(palavra => palavra.length > 0);
        setDicionario(palavras);
      } catch (error) {
        console.error('Erro ao carregar dicionário:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarDicionario();
  }, []);

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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Soletra</h1>
          </div>
          <p className="text-lg text-gray-600">
            Encontre palavras do dicionário com base em letras específicas
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {dicionario.length.toLocaleString()} palavras carregadas
          </p>
        </div>

        {/* Formulário de busca */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Letras Permitidas
              </label>
              <input
                type="text"
                value={searchParams.letrasPermitidas}
                onChange={(e) => setSearchParams(prev => ({ ...prev, letrasPermitidas: e.target.value }))}
                placeholder="Ex: abcdefg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">
                Digite todas as letras que podem ser usadas
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Letra Obrigatória
              </label>
              <input
                type="text"
                value={searchParams.letraObrigatoria}
                onChange={(e) => setSearchParams(prev => ({ ...prev, letraObrigatoria: e.target.value.slice(0, 1) }))}
                placeholder="Ex: a"
                maxLength={1}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">
                Uma letra que deve aparecer na palavra
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade de Letras
              </label>
              <input
                type="number"
                value={searchParams.quantidadeLetras}
                onChange={(e) => setSearchParams(prev => ({ ...prev, quantidadeLetras: parseInt(e.target.value) || 5 }))}
                min="1"
                max="20"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tamanho exato das palavras a serem encontradas
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={buscarPalavras}
              disabled={searching}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {searching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Palavras
                </>
              )}
            </button>

            {resultados.length > 0 && (
              <button
                onClick={limparResultados}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Resultados */}
        {resultados.length > 0 && (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">
                Resultados ({resultados.length} palavras encontradas)
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
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
        )}

        {/* Informações de uso */}
        <div className="max-w-2xl mx-auto mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Como usar:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Digite todas as letras que podem ser usadas nas palavras</li>
                <li>Escolha uma letra que DEVE aparecer em todas as palavras encontradas</li>
                <li>Defina o número exato de letras que as palavras devem ter</li>
                <li>A letra obrigatória deve estar presente nas letras permitidas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
