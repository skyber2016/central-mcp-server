import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerRagTool(server: McpServer, client: GatewayClient): void {
  server.registerTool(
    'ask_rag',
    {
      description:
        'Answer a question using Retrieval-Augmented Generation (RAG). ' +
        'Searches indexed documents for relevant context, then generates an answer using an LLM. ' +
        'Returns the answer along with source documents used. ' +
        'The project is automatically determined by the API key. ' +
        'Requires API key with rag:generate scope.',
      inputSchema: {
        question: z.string().describe('The question to answer using indexed knowledge'),
      },
    },
    async ({ question }) => {
      const result = await client.rag(question);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
