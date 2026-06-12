import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerJobsTool(server: McpServer, client: GatewayClient): void {
  server.registerTool(
    'get_index_job',
    {
      description: 'Get the status of an indexing job',
      inputSchema: {
        jobId: z.string().describe('The job ID to check'),
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
