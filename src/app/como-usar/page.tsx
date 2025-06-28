import { AlertTriangle, ArrowLeft, CheckCircle, HelpCircle, Lightbulb } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Como Usar o Soletra - Tutorial Completo de Busca de Palavras",
  description: "Aprenda a usar o Soletra de forma eficiente. Tutorial completo com exemplos práticos para encontrar palavras em português para jogos, palavras cruzadas e estudos.",
  keywords: [
    "como usar soletra",
    "tutorial busca palavras",
    "guia soletra",
    "exemplos busca palavras",
    "dicas soletra",
    "manual usuario soletra"
  ],
  openGraph: {
    title: "Como Usar o Soletra - Tutorial Completo",
    description: "Aprenda a usar o Soletra para encontrar palavras em português de forma eficiente. Guia completo com exemplos práticos.",
  }
};

export default function ComoUsarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Soletra
          </Link>

          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="h-16 w-16 text-indigo-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Como Usar o Soletra</h1>
              <p className="text-lg text-gray-600 mt-2">Tutorial completo para busca de palavras</p>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto space-y-8">
          {/* Introdução */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Introdução Rápida</h2>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-6">
              <p className="text-indigo-800">
                O <strong>Soletra</strong> é uma ferramenta que encontra palavras em português baseada em três critérios simples:
                letras permitidas, uma letra obrigatória e o tamanho da palavra.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600 mb-2">1</div>
                <h3 className="font-semibold mb-2">Letras Permitidas</h3>
                <p className="text-sm text-gray-600">Todas as letras que podem aparecer nas palavras</p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600 mb-2">2</div>
                <h3 className="font-semibold mb-2">Letra Obrigatória</h3>
                <p className="text-sm text-gray-600">Uma letra que DEVE aparecer em todas as palavras</p>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600 mb-2">3</div>
                <h3 className="font-semibold mb-2">Tamanho da Palavra</h3>
                <p className="text-sm text-gray-600">Número exato de letras que as palavras devem ter</p>
              </div>
            </div>
          </section>

          {/* Passo a Passo */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Passo a Passo Detalhado</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Digite as Letras Permitidas</h3>
                  <p className="text-gray-600 mb-3">
                    No campo "Letras Permitidas", digite todas as letras que podem ser usadas para formar palavras.
                    Não se preocupe com maiúsculas, minúsculas ou acentos - o sistema trata automaticamente.
                  </p>
                  <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                    <strong>Exemplo:</strong> <code className="bg-gray-200 px-2 py-1 rounded">abcdefg</code>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Escolha a Letra Obrigatória</h3>
                  <p className="text-gray-600 mb-3">
                    Selecione UMA letra que deve aparecer em todas as palavras encontradas. Esta letra deve estar
                    presente no conjunto de letras permitidas.
                  </p>
                  <div className="bg-gray-50 p-3 rounded border-l-4 border-green-400">
                    <strong>Exemplo:</strong> Se suas letras permitidas são "abcdefg", você pode escolher "c" como obrigatória
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Defina o Tamanho</h3>
                  <p className="text-gray-600 mb-3">
                    Especifique quantas letras as palavras devem ter. O Soletra encontrará apenas palavras
                    com exatamente esse número de letras.
                  </p>
                  <div className="bg-gray-50 p-3 rounded border-l-4 border-purple-400">
                    <strong>Exemplo:</strong> Para palavras de 5 letras, digite <code className="bg-gray-200 px-2 py-1 rounded">5</code>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Clique em "Buscar Palavras"</h3>
                  <p className="text-gray-600">
                    Após preencher todos os campos, clique no botão azul para iniciar a busca.
                    Os resultados aparecerão instantaneamente abaixo do formulário.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Exemplos Práticos */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Exemplos Práticos</h2>

            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Exemplo 1: Spelling Bee Simples
                </h3>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <strong>Letras Permitidas:</strong>
                    <div className="bg-blue-50 p-2 rounded mt-1">aeioubcdfg</div>
                  </div>
                  <div>
                    <strong>Letra Obrigatória:</strong>
                    <div className="bg-green-50 p-2 rounded mt-1">u</div>
                  </div>
                  <div>
                    <strong>Tamanho:</strong>
                    <div className="bg-purple-50 p-2 rounded mt-1">6 letras</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  <strong>Resultado esperado:</strong> Palavras de 6 letras que contenham "u" e usem apenas as letras disponíveis.
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Exemplo 2: Palavras Cruzadas
                </h3>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <strong>Letras Permitidas:</strong>
                    <div className="bg-blue-50 p-2 rounded mt-1">aeiourstlnm</div>
                  </div>
                  <div>
                    <strong>Letra Obrigatória:</strong>
                    <div className="bg-green-50 p-2 rounded mt-1">r</div>
                  </div>
                  <div>
                    <strong>Tamanho:</strong>
                    <div className="bg-purple-50 p-2 rounded mt-1">7 letras</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  <strong>Uso:</strong> Para completar uma palavra cruzada onde você sabe que a palavra tem 7 letras e contém "r".
                </p>
              </div>

              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Exemplo 3: Letreco (Wordle Português)
                </h3>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <strong>Letras Permitidas:</strong>
                    <div className="bg-blue-50 p-2 rounded mt-1">aeiouchlmr</div>
                  </div>
                  <div>
                    <strong>Letra Obrigatória:</strong>
                    <div className="bg-green-50 p-2 rounded mt-1">a</div>
                  </div>
                  <div>
                    <strong>Tamanho:</strong>
                    <div className="bg-purple-50 p-2 rounded mt-1">5 letras</div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  <strong>Estratégia:</strong> Encontrar palavras de 5 letras com "a" para suas próximas tentativas no Letreco.
                </p>
              </div>
            </div>
          </section>

          {/* Dicas e Truques */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dicas e Truques</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Use vogais estrategicamente</h4>
                    <p className="text-sm text-gray-600">
                      Inclua várias vogais (a, e, i, o, u) nas letras permitidas para encontrar mais palavras.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Experimente diferentes tamanhos</h4>
                    <p className="text-sm text-gray-600">
                      Se não encontrar palavras, tente aumentar ou diminuir o número de letras.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Letras comuns em português</h4>
                    <p className="text-sm text-gray-600">
                      As letras mais frequentes são: a, e, o, s, r, i, n, d, m, u, t, c, l, p, v, g, h, q, b, f, z, j, x, k, w, y.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Letra obrigatória deve estar incluída</h4>
                    <p className="text-sm text-gray-600">
                      Certifique-se de que a letra obrigatória está presente nas letras permitidas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Não use acentos ou caracteres especiais</h4>
                    <p className="text-sm text-gray-600">
                      Digite apenas letras simples (a-z). O sistema normaliza automaticamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Limite de letras</h4>
                    <p className="text-sm text-gray-600">
                      Palavras podem ter de 1 a 20 letras, mas palavras muito longas são raras.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Perguntas Frequentes</h2>

            <div className="space-y-4">
              <details className="border-l-4 border-indigo-400 pl-4">
                <summary className="font-semibold text-gray-800 cursor-pointer hover:text-indigo-600">
                  Por que não encontro nenhuma palavra?
                </summary>
                <div className="mt-2 text-gray-600 text-sm">
                  <p>Isso pode acontecer se:</p>
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>A letra obrigatória não está nas letras permitidas</li>
                    <li>O conjunto de letras é muito restritivo</li>
                    <li>O tamanho da palavra é inadequado para as letras disponíveis</li>
                    <li>Não existem palavras válidas com essas condições</li>
                  </ul>
                </div>
              </details>

              <details className="border-l-4 border-indigo-400 pl-4">
                <summary className="font-semibold text-gray-800 cursor-pointer hover:text-indigo-600">
                  Posso usar a mesma letra várias vezes?
                </summary>
                <div className="mt-2 text-gray-600 text-sm">
                  <p>
                    Sim! Se você digitar uma letra várias vezes nas "Letras Permitidas", ela pode aparecer
                    múltiplas vezes na mesma palavra. Por exemplo, "banana" usa "a" três vezes e "n" duas vezes.
                  </p>
                </div>
              </details>

              <details className="border-l-4 border-indigo-400 pl-4">
                <summary className="font-semibold text-gray-800 cursor-pointer hover:text-indigo-600">
                  O Soletra inclui palavras com acentos?
                </summary>
                <div className="mt-2 text-gray-600 text-sm">
                  <p>
                    Sim, nosso dicionário inclui palavras acentuadas em português. O sistema normaliza
                    automaticamente sua busca, então você não precisa digitar acentos.
                  </p>
                </div>
              </details>

              <details className="border-l-4 border-indigo-400 pl-4">
                <summary className="font-semibold text-gray-800 cursor-pointer hover:text-indigo-600">
                  Quantas palavras o Soletra conhece?
                </summary>
                <div className="mt-2 text-gray-600 text-sm">
                  <p>
                    Nossa base contém mais de 100.000 palavras do português brasileiro, incluindo
                    substantivos, adjetivos, verbos e advérbios comuns e menos comuns.
                  </p>
                </div>
              </details>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Agora você é um expert!</h2>
            <p className="text-lg mb-6 opacity-90">
              Coloque seu conhecimento em prática e descubra novas palavras
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              Começar a Usar o Soletra
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}
