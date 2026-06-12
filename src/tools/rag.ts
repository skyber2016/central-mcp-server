import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerRagTool(server: McpServer, client: GatewayClient): void {
  server.tool(
    'ask_rag',
    'Answer a question using Retrieval-Augmented Generation from indexed knowledge',
    {
      question: z.string().describe('The question to answer'),
    },
    async ({ question }) => {
      const result = await client.rag(question);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
