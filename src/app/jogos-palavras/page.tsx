import { ArrowLeft, Brain, GamepadIcon, Puzzle, Target, Trophy } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Jogos de Palavras em Português - Spelling Bee, Scrabble, Letreco e Mais",
  description: "Descubra os melhores jogos de palavras em português e como o Soletra pode ajudar você a vencer no Spelling Bee, Scrabble, palavras cruzadas, Letreco e outros desafios linguísticos.",
  keywords: [
    "jogos de palavras português",
    "spelling bee português",
    "scrabble português",
    "letreco dicas",
    "palavras cruzadas",
    "anagramas português",
    "wordle português",
    "jogos linguísticos",
    "desafios palavras",
    "vocabulário português"
  ],
  openGraph: {
    title: "Jogos de Palavras em Português - Guia Completo",
    description: "Aprenda sobre os melhores jogos de palavras em português e como usar o Soletra para melhorar seu desempenho.",
  }
};

export default function JogosPalavrasPage() {
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
            <GamepadIcon className="h-16 w-16 text-indigo-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Jogos de Palavras em Português</h1>
              <p className="text-lg text-gray-600 mt-2">Domine os desafios linguísticos com o Soletra</p>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto space-y-8">
          {/* Introdução */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Por que Jogos de Palavras?</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-600 mb-4">
                  Os <strong>jogos de palavras</strong> são uma forma divertida e eficaz de expandir seu vocabulário,
                  melhorar sua fluência em português e exercitar o cérebro. Desde o clássico Scrabble até os
                  modernos jogos digitais como Letreco, esses desafios linguísticos oferecem entretenimento
                  educativo para todas as idades.
                </p>
                <p className="text-gray-600">
                  O <strong>Soletra</strong> foi desenvolvido especificamente para ajudar você a ter melhor
                  desempenho nesses jogos, oferecendo uma ferramenta poderosa para encontrar palavras
                  estratégicas quando você mais precisa.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-indigo-50 rounded-lg">
                  <Brain className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Exercita o Cérebro</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Melhora Vocabulário</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Desenvolve Estratégia</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Puzzle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm font-medium">Diversão Garantida</p>
                </div>
              </div>
            </div>
          </section>

          {/* Jogos Populares */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Jogos Populares de Palavras</h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Spelling Bee */}
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 rounded-full p-3 mr-4">
                    <span className="text-2xl">🐝</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Spelling Bee</h3>
                    <p className="text-gray-600 text-sm">O clássico jogo de soletração</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  No <strong>Spelling Bee</strong>, você recebe um conjunto de letras e deve encontrar o maior
                  número possível de palavras. Uma das letras é obrigatória e deve aparecer em todas as palavras.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Como o Soletra Ajuda:</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Digite as letras disponíveis no campo "Letras Permitidas"</li>
                    <li>• Coloque a letra central como "Letra Obrigatória"</li>
                    <li>• Teste diferentes tamanhos de palavra (4, 5, 6+ letras)</li>
                    <li>• Encontre todas as palavras possíveis para maximizar sua pontuação</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-500">
                  <strong>Dica:</strong> No Spelling Bee do NY Times, palavras com 4+ letras são válidas!
                </p>
              </div>

              {/* Letreco */}
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Letreco (Wordle Português)</h3>
                    <p className="text-gray-600 text-sm">Descubra a palavra do dia</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  O <strong>Letreco</strong> é a versão brasileira do famoso Wordle. Você tem 6 tentativas
                  para descobrir uma palavra de 5 letras, recebendo dicas sobre letras corretas e posições.
                </p>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">Como o Soletra Ajuda:</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Use letras confirmadas como "Letras Permitidas"</li>
                    <li>• Coloque uma letra que você sabe que existe como obrigatória</li>
                    <li>• Sempre configure para 5 letras</li>
                    <li>• Explore palavras com vogais diferentes para eliminar possibilidades</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-500">
                  <strong>Estratégia:</strong> Comece com palavras ricas em vogais como "OREAS" ou "AUDIO"!
                </p>
              </div>

              {/* Scrabble */}
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <span className="text-2xl">🎲</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Scrabble</h3>
                    <p className="text-gray-600 text-sm">O jogo de palavras mais famoso do mundo</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  No <strong>Scrabble</strong>, você forma palavras cruzadas em um tabuleiro, ganhando pontos
                  baseados no valor das letras e posições especiais do tabuleiro.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Como o Soletra Ajuda:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Digite suas 7 peças como "Letras Permitidas"</li>
                    <li>• Use letras do tabuleiro como obrigatórias para formar palavras conectadas</li>
                    <li>• Teste diferentes tamanhos para encontrar a jogada de maior pontuação</li>
                    <li>• Explore palavras curtas com letras de alto valor (Q, X, Z)</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-500">
                  <strong>Dica:</strong> Palavras de 2 letras são válidas no Scrabble e podem ser muito estratégicas!
                </p>
              </div>

              {/* Palavras Cruzadas */}
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 rounded-full p-3 mr-4">
                    <span className="text-2xl">🧩</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Palavras Cruzadas</h3>
                    <p className="text-gray-600 text-sm">O clássico passatempo de jornais</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  As <strong>palavras cruzadas</strong> combinam conhecimento geral com vocabulário,
                  exigindo que você encontre palavras que se encaixem tanto na dica quanto no espaço disponível.
                </p>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Como o Soletra Ajuda:</h4>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Use letras já preenchidas como "Letras Permitidas"</li>
                    <li>• Coloque uma letra de cruzamento conhecida como obrigatória</li>
                    <li>• Configure o tamanho exato da palavra que precisa</li>
                    <li>• Encontre palavras que se encaixem perfeitamente no espaço</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-500">
                  <strong>Técnica:</strong> Resolva primeiro as palavras mais curtas para revelar letras das maiores!
                </p>
              </div>
            </div>
          </section>

          {/* Outros Jogos */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Outros Jogos de Palavras Populares</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <span className="text-4xl mb-4 block">🔤</span>
                <h3 className="font-bold text-gray-800 mb-2">Anagramas</h3>
                <p className="text-gray-600 text-sm">
                  Forme novas palavras reorganizando as letras de uma palavra existente.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <span className="text-4xl mb-4 block">📝</span>
                <h3 className="font-bold text-gray-800 mb-2">Boggle</h3>
                <p className="text-gray-600 text-sm">
                  Encontre palavras conectando letras adjacentes em uma grade 4x4.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <span className="text-4xl mb-4 block">🎪</span>
                <h3 className="font-bold text-gray-800 mb-2">Roda da Fortuna</h3>
                <p className="text-gray-600 text-sm">
                  Descubra frases ou palavras revelando letras uma por vez.
                </p>
              </div>
            </div>
          </section>

          {/* Estratégias Gerais */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Estratégias Gerais para Jogos de Palavras</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">🧠 Desenvolvimento de Vocabulário</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li><strong>Leia regularmente:</strong> Livros, jornais e revistas expandem seu vocabulário naturalmente</li>
                  <li><strong>Estude palavras curtas:</strong> Palavras de 2-3 letras são valiosas em muitos jogos</li>
                  <li><strong>Aprenda sufixos e prefixos:</strong> -MENTE, -AÇÃO, RE-, DES- são muito úteis</li>
                  <li><strong>Memorize palavras com Q sem U:</strong> Como "QIGONG" (embora rara em português)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">⚡ Técnicas de Jogo</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li><strong>Priorize vowais:</strong> A, E, I, O, U são fundamentais na maioria das palavras</li>
                  <li><strong>Conheça as letras frequentes:</strong> S, R, N, T, L aparecem em muitas palavras</li>
                  <li><strong>Pense em plurais:</strong> Adicionar S pode revelar novas possibilidades</li>
                  <li><strong>Considere verbos conjugados:</strong> -AR, -ER, -IR e suas conjugações</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Como Usar o Soletra */}
          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Maximize Seu Desempenho com o Soletra</h2>
              <p className="text-lg opacity-90">
                Siga estes passos para usar o Soletra eficientemente em qualquer jogo de palavras
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Identifique suas letras disponíveis</h4>
                    <p className="text-sm opacity-90">
                      Anote todas as letras que você pode usar no jogo atual
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Determine se há letras obrigatórias</h4>
                    <p className="text-sm opacity-90">
                      No Spelling Bee é a letra central, no Scrabble pode ser uma letra do tabuleiro
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Configure o tamanho da palavra</h4>
                    <p className="text-sm opacity-90">
                      Teste diferentes tamanhos para encontrar todas as possibilidades
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Analise os resultados estrategicamente</h4>
                    <p className="text-sm opacity-90">
                      Escolha palavras que maximizem pontos ou abram novas possibilidades
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/"
                className="inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Usar o Soletra Agora
              </Link>
            </div>
          </section>

          {/* FAQ para Jogos */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Perguntas Frequentes sobre Jogos de Palavras</h2>

            <div className="space-y-4">
              <details className="border-l-4 border-indigo-400 pl-4">
                <summary className="font-semibold text-gray-800 cursor-pointer hover:text-indigo-600">
                  Qual é a diferença entre Spelling Bee americano e português?
                </summary>
                <div className="mt-2 text-gray-600 text-sm">
                  <p>
                    O Spelling Bee original do NY Times é em inglês, mas existem versões adaptadas para português.
                    As regras são similares: você tem um conjunto de letras e deve formar palavras contendo uma letra específica.
                    O Soletra funciona perfeitamente para ambas as versões.
                  </p>
                </div>
              </details>

              <details className="border-l-4 border-indigo-400 pl-4">
                <summary className="font-semibold text-gray-800 cursor-pointer hover:text-indigo-600">
                  Posso usar o Soletra para treinar para competições de Scrabble?
                </summary>
                <div className="mt-2 text-gray-600 text-sm">
                  <p>
                    Absolutamente! O Soletra é uma excelente ferramenta de treinamento. Pratique encontrando palavras
                    com diferentes combinações de letras, especialmente palavras curtas e com letras de alto valor.
                    Lembre-se de que em competições oficiais, apenas dicionários aprovados são válidos.
                  </p>
                </div>
              </details>

              <details className="border-l-4 border-indigo-400 pl-4">
                <summary className="font-semibold text-gray-800 cursor-pointer hover:text-indigo-600">
                  O Soletra inclui gírias e palavras coloquiais?
                </summary>
                <div className="mt-2 text-gray-600 text-sm">
                  <p>
                    Nosso dicionário foca em palavras formais do português brasileiro encontradas em dicionários padrão.
                    Gírias e expressões muito coloquiais geralmente não são incluídas, mas palavras informais que são
                    amplamente reconhecidas podem estar presentes.
                  </p>
                </div>
              </details>

              <details className="border-l-4 border-indigo-400 pl-4">
                <summary className="font-semibold text-gray-800 cursor-pointer hover:text-indigo-600">
                  Como melhorar minha estratégia em jogos de palavras?
                </summary>
                <div className="mt-2 text-gray-600 text-sm">
                  <p>
                    Pratique regularmente, estude listas de palavras comuns, aprenda sobre frequência de letras em português,
                    e use ferramentas como o Soletra para explorar possibilidades. Também é útil jogar diferentes tipos de
                    jogos de palavras para desenvolver flexibilidade mental.
                  </p>
                </div>
              </details>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
