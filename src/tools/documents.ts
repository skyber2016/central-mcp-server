import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerDocumentsTools(server: McpServer, client: GatewayClient): void {
  server.tool(
    'list_documents',
    'List indexed documents, optionally filtered by project',
    {
      project: z.string().optional().describe('Project ID to filter by'),
    },
    async ({ project }) => {
      const result = await client.listDocuments(project);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.tool(
    'index_document',
    'Submit a new document for indexing into the knowledge base',
    {
      title: z.string().describe('Document title'),
      content: z.string().describe('Document content to index'),
      source: z.string().default('manual').describe('Source identifier'),
    },
    async ({ title, content, source }) => {
      const result = await client.indexDocument(title, content, source);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
