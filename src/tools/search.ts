import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerSearchTool(server: McpServer, client: GatewayClient): void {
  server.registerTool(
    'search_documents',
    {
      description:
        'Search indexed documents using semantic similarity. ' +
        'Returns the most relevant document chunks matching the query. ' +
        'The project is automatically determined by the API key. ' +
        'Requires API key with search:query scope.',
      inputSchema: {
        query: z.string().describe('Natural language search query'),
        limit: z
          .number()
          .optional()
          .default(5)
          .describe('Maximum number of results to return (default: 5)'),
      },
    },
    async ({ query, limit }) => {
      const result = await client.search(query, limit);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
