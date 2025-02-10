import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBBxiNMCu22aZsHxqiIpdkT4qa4TVadAs4');

export async function generateDorks(productName: string, paymentGateway: string, count: number): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Você é um especialista em criar dorks do Google para buscas direcionadas. Sua tarefa é criar ${count} dorks eficazes com base nos seguintes critérios:

1. Produto: ${productName}
2. Gateway de Pagamento: ${paymentGateway}

Use técnicas avançadas de dorking como:
- 'inurl:' para localizar URLs contendo palavras-chave específicas.
- 'intext:' para encontrar páginas mencionando o produto ou gateway.
- 'site:' para focar em plataformas de e-commerce ou regiões específicas.
- Operadores lógicos ('AND', 'OR', '-') para refinar a busca.

Além disso, considere variações comuns do nome do produto e termos do gateway para maximizar a precisão. Otimize os dorks para máxima especificidade mantendo a funcionalidade em diferentes mecanismos de busca.

Retorne APENAS os ${count} dorks em formato de texto simples, um por linha, sem texto ou explicação adicional.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().split('\n').filter(dork => dork.trim() !== '').slice(0, count);
}
