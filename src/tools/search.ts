import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerSearchTool(server: McpServer, client: GatewayClient): void {
  server.registerTool(
    'search_documents',
    {
      description: 'Search indexed documents using semantic similarity',
      inputSchema: {
        query: z.string().describe('Search query'),
        limit: z.number().optional().default(5).describe('Maximum number of results to return'),
      }
    },
    async ({ query, limit }) => {
      const result = await client.search(query, limit);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
