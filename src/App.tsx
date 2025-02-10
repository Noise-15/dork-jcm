import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Terminal } from 'lucide-react';
import { DorkForm } from './components/DorkForm';
import { Login } from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-right" />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Terminal size={48} className="text-magenta-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-magenta-500 to-purple-500 text-transparent bg-clip-text">
            GERADOR DE DORKS JCM GROUP By N0is3/Rogu3_
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Gere dorks precisos para encontrar produtos em lojas online com gateways de pagamento específicos.
            Alimentado por técnicas avançadas de busca e otimização por IA.
          </p>
        </div>

        {isLoggedIn ? <DorkForm /> : <Login setIsLoggedIn={setIsLoggedIn} />}

        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-magenta-500">Perguntas Frequentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">O que são dorks?</h3>
              <p className="text-gray-400">
                Dorks são consultas de pesquisa avançadas que usam operadores especiais para encontrar informações
                específicas na internet. Eles ajudam a refinar os resultados da pesquisa para encontrar exatamente
                o que você está procurando.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Como funciona?</h3>
              <p className="text-gray-400">
                Nosso gerador combina suas entradas de produto e gateway de pagamento com operadores de
                pesquisa avançados como inurl:, intext: e site:. A consulta é então otimizada por IA para
                garantir os resultados mais relevantes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Diretrizes de Uso</h3>
              <p className="text-gray-400">
                Por favor, use esta ferramenta de forma responsável e ética. Ela foi projetada para ajudar
                a encontrar produtos legítimos e não deve ser usada para fins maliciosos ou para explorar
                vulnerabilidades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
