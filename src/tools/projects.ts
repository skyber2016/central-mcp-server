import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GatewayClient } from '../gateway-client.js';

export function registerProjectsTool(server: McpServer, client: GatewayClient): void {
  server.tool(
    'list_projects',
    'List all accessible projects in the Knowledge Gateway',
    {},
    async () => {
      const result = await client.listProjects();
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
