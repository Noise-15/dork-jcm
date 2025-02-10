import React, { useState } from 'react';
import { Search, Copy, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateDorks } from '../lib/gemini';
import type { DorkGeneratorFormData, DorkResponse } from '../types';

const PAYMENT_GATEWAYS = [
  'PayPal',
  'Stripe',
  'Square',
  'Shopify Payments',
  'Amazon Pay',
  'Google Pay',
  'Outro'
];

const DORK_COUNT_OPTIONS = [1, 3, 5, 10];

export function DorkForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<DorkGeneratorFormData>({
    productName: '',
    paymentGateway: PAYMENT_GATEWAYS[0],
    customGateway: '',
    dorkCount: 1
  });
  const [dorkResponse, setDorkResponse] = useState<DorkResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const gateway = formData.paymentGateway === 'Outro' ? formData.customGateway : formData.paymentGateway;
      const dorks = await generateDorks(formData.productName, gateway, formData.dorkCount);
      const searchUrls = dorks.map(dork => `https://www.google.com/search?q=${encodeURIComponent(dork)}`);
      setDorkResponse({ dorks, searchUrls });
    } catch (error) {
      toast.error('Falha ao gerar dorks. Por favor, tente novamente.');
      console.error('Error generating dorks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (dork: string) => {
    navigator.clipboard.writeText(dork);
    toast.success('Dork copiado para a área de transferência!');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-200 mb-2">
            Nome do Produto
          </label>
          <input
            id="productName"
            type="text"
            required
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-magenta-500 focus:border-transparent"
            placeholder="Digite o nome do produto..."
          />
        </div>

        <div>
          <label htmlFor="paymentGateway" className="block text-sm font-medium text-gray-200 mb-2">
            Gateway de Pagamento
          </label>
          <select
            id="paymentGateway"
            value={formData.paymentGateway}
            onChange={(e) => setFormData({ ...formData, paymentGateway: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-magenta-500 focus:border-transparent"
          >
            {PAYMENT_GATEWAYS.map((gateway) => (
              <option key={gateway} value={gateway}>
                {gateway}
              </option>
            ))}
          </select>
        </div>

        {formData.paymentGateway === 'Outro' && (
          <div>
            <label htmlFor="customGateway" className="block text-sm font-medium text-gray-200 mb-2">
              Nome do Gateway Personalizado
            </label>
            <input
              id="customGateway"
              type="text"
              required
              value={formData.customGateway}
              onChange={(e) => setFormData({ ...formData, customGateway: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-magenta-500 focus:border-transparent"
              placeholder="Digite o nome do gateway..."
            />
          </div>
        )}

        <div>
          <label htmlFor="dorkCount" className="block text-sm font-medium text-gray-200 mb-2">
            Quantidade de Dorks
          </label>
          <select
            id="dorkCount"
            value={formData.dorkCount}
            onChange={(e) => setFormData({ ...formData, dorkCount: parseInt(e.target.value, 10) })}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-magenta-500 focus:border-transparent"
          >
            {DORK_COUNT_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? 'dork' : 'dorks'}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 rounded-lg bg-magenta-600 hover:bg-magenta-700 text-white font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Search size={20} />
              <span>Gerar Dorks</span>
            </>
          )}
        </button>
      </form>

      {dorkResponse && (
        <div className="mt-8 space-y-4">
          {dorkResponse.dorks.map((dork, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-800 border border-gray-700">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium text-white mb-2">Dork {index + 1}:</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(dork)}
                    className="p-2 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                    title="Copiar para área de transferência"
                  >
                    <Copy size={20} />
                  </button>
                  <a
                    href={dorkResponse.searchUrls[index]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                    title="Abrir no Google"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <pre className="mt-2 p-3 bg-gray-900 rounded-lg overflow-x-auto text-sm text-gray-200">
                {dork}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
