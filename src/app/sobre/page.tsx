import { ArrowLeft, BookOpen, Target, Users, Zap } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Sobre o Soletra - Ferramenta de Busca de Palavras em Português",
  description: "Conheça a história e funcionalidades do Soletra, a ferramenta online gratuita para encontrar palavras em português. Saiba como utilizamos mais de 100.000 palavras para ajudar em jogos e estudos.",
  keywords: [
    "sobre soletra",
    "história ferramenta palavras",
    "como funciona busca palavras",
    "dicionário português online",
    "desenvolvimento soletra"
  ],
  openGraph: {
    title: "Sobre o Soletra - Ferramenta de Busca de Palavras",
    description: "Conheça a ferramenta online gratuita para encontrar palavras em português com mais de 100.000 palavras disponíveis.",
  }
};

export default function SobrePage() {
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
            <BookOpen className="h-16 w-16 text-indigo-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Sobre o Soletra</h1>
              <p className="text-lg text-gray-600 mt-2">Sua ferramenta de busca de palavras em português</p>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto">
          {/* História e Missão */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nossa Missão</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                O <strong>Soletra</strong> nasceu da necessidade de ter uma ferramenta rápida, confiável e gratuita
                para encontrar palavras em português brasileiro. Seja para resolver jogos de palavras, completar
                palavras cruzadas ou estudar vocabulário, nossa missão é democratizar o acesso ao conhecimento linguístico.
              </p>
              <p className="mb-4">
                Com mais de <strong>100.000 palavras</strong> cuidadosamente selecionadas do dicionário português,
                oferecemos uma experiência de busca intuitiva e eficiente, sem a necessidade de cadastros ou
                pagamentos.
              </p>
            </div>
          </section>

          {/* Funcionalidades */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Como Funciona</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Busca Precisa</h3>
                <p className="text-sm text-gray-600">
                  Encontre palavras com letras específicas e tamanho exato
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Resultados Instantâneos</h3>
                <p className="text-sm text-gray-600">
                  Algoritmo otimizado para busca rápida em tempo real
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Para Todos</h3>
                <p className="text-sm text-gray-600">
                  Interface simples para estudantes, jogadores e profissionais
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Algoritmo de Busca</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
                <li>Validação das letras permitidas e obrigatória</li>
                <li>Filtragem por tamanho exato da palavra</li>
                <li>Verificação da presença da letra obrigatória</li>
                <li>Confirmação de que todas as letras estão no conjunto permitido</li>
                <li>Apresentação dos resultados ordenados alfabeticamente</li>
              </ol>
            </div>
          </section>

          {/* Casos de Uso */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Casos de Uso Populares</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">🎯 Jogos de Palavras</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li><strong>Spelling Bee:</strong> Encontre todas as palavras possíveis com letras específicas</li>
                  <li><strong>Scrabble/Palavras Cruzadas:</strong> Maximize sua pontuação com palavras estratégicas</li>
                  <li><strong>Letreco (Wordle Português):</strong> Descubra palavras de 5 letras</li>
                  <li><strong>Anagramas:</strong> Explore combinações criativas de letras</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">📚 Educação e Pesquisa</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li><strong>Estudo de Vocabulário:</strong> Expandir conhecimento linguístico</li>
                  <li><strong>Criação de Conteúdo:</strong> Encontrar sinônimos e variações</li>
                  <li><strong>Ensino de Português:</strong> Atividades e exercícios interativos</li>
                  <li><strong>Pesquisa Linguística:</strong> Análise de padrões e frequências</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Especificações Técnicas */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Especificações Técnicas</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Base de Dados</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>Mais de 100.000 palavras em português brasileiro</li>
                  <li>Incluí substantivos, adjetivos, verbos e advérbios</li>
                  <li>Filtro de palavras válidas com acentuação correta</li>
                  <li>Atualização periódica do dicionário</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Tecnologia</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>Interface desenvolvida com Next.js e React</li>
                  <li>Design responsivo com Tailwind CSS</li>
                  <li>Algoritmo de busca otimizado para performance</li>
                  <li>Hospedagem estática para carregamento rápido</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-indigo-600 text-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-lg mb-6 opacity-90">
              Explore o poder da busca de palavras em português com o Soletra
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Usar o Soletra Agora
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}
