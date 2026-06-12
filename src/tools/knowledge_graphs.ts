import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerKnowledgeGraphsTools(server: McpServer, client: GatewayClient): void {
  server.tool(
    'list_knowledge_graphs',
    'List indexed knowledge graphs, optionally filtered by project',
    {
      project: z.string().optional().describe('Project ID to filter by'),
    },
    async ({ project }) => {
      const result = await client.listKnowledgeGraphs(project);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.tool(
    'delete_knowledge_graph',
    'Delete a knowledge graph and its associated vectors',
    {
      id: z.string().describe('Knowledge Graph ID to delete'),
    },
    async ({ id }) => {
      await client.deleteKnowledgeGraph(id);
      return {
        content: [{ type: 'text' as const, text: `Knowledge Graph ${id} deleted successfully` }],
      };
    },
  );
}
