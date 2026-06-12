import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerDocumentsTools(server: McpServer, client: GatewayClient): void {
  server.registerTool(
    'list_documents',
    {
      description: 'List indexed documents, optionally filtered by project',
      inputSchema: {
        project: z.string().optional().describe('Project ID to filter by'),
      }
    },
    async ({ project }) => {
      const result = await client.listDocuments(project);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    'index_document',
    {
      description: 'Submit a new document for indexing into the knowledge base',
      inputSchema: {
        title: z.string().describe('Document title'),
        content: z.string().describe('Document content to index'),
        source: z.string().default('manual').describe('Source identifier'),
      }
    },
    async ({ title, content, source }) => {
      const result = await client.indexDocument(title, content, source);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    'delete_document',
    {
      description: 'Delete a document and its associated vectors',
      inputSchema: {
        id: z.string().describe('Document ID to delete'),
      }
    },
    async ({ id }) => {
      await client.deleteDocument(id);
      return {
        content: [{ type: 'text' as const, text: `Document ${id} deleted successfully` }],
      };
    },
  );
}
