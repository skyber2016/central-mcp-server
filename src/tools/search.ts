import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerSearchTool(server: McpServer, client: GatewayClient): void {
  server.tool(
    'search_documents',
    'Search indexed documents using semantic similarity',
    {
      query: z.string().describe('The search query'),
      limit: z.number().min(1).max(20).default(5).describe('Max results to return'),
    },
    async ({ query, limit }) => {
      const result = await client.search(query, limit);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
