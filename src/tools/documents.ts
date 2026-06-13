import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerDocumentsTools(server: McpServer, client: GatewayClient): void {
  server.registerTool(
    'index_document',
    {
      description: 'Submit a new document for indexing into the knowledge base. The document will be chunked, embedded, and stored in the vector database for semantic search and RAG.',
      inputSchema: {
        title: z.string().describe('Document title'),
        content: z.string().describe('Document content to index'),
        source: z.string().default('mcp').describe('Source identifier (e.g. mcp, api, manual)'),
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
    'get_index_job',
    {
      description: 'Get the status of a document indexing job. Use this after index_document to check if indexing completed successfully.',
      inputSchema: {
        jobId: z.string().describe('The job ID returned by index_document'),
      }
    },
    async ({ jobId }) => {
      const result = await client.getJobStatus(jobId);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
