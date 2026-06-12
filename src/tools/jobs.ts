import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerJobsTool(server: McpServer, client: GatewayClient): void {
  server.tool(
    'get_index_job',
    'Get the status of an indexing job',
    {
      jobId: z.string().describe('The index job ID'),
    },
    async ({ jobId }) => {
      const result = await client.getJobStatus(jobId);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
