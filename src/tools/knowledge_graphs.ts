import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerKnowledgeGraphsTools(server: McpServer, client: GatewayClient): void {
  server.registerTool(
    'list_knowledge_graphs',
    {
      description: 'List indexed knowledge graphs, optionally filtered by project',
      inputSchema: {
        project: z.string().optional().describe('Project ID to filter by'),
      }
    },
    async ({ project }) => {
      const result = await client.listKnowledgeGraphs(project);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    'delete_knowledge_graph',
    {
      description: 'Delete a knowledge graph and its associated vectors',
      inputSchema: {
        id: z.string().describe('Knowledge Graph ID to delete'),
      }
    },
    async ({ id }) => {
      await client.deleteKnowledgeGraph(id);
      return {
        content: [{ type: 'text' as const, text: `Knowledge Graph ${id} deleted successfully` }],
      };
    },
  );
}
