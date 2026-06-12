import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GatewayClient } from '../gateway-client.js';

export function registerResources(server: McpServer, client: GatewayClient): void {
  server.resource(
    'documents',
    'knowledge://documents',
    async (uri) => {
      const result = await client.listDocuments();
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    },
  );

  server.resource(
    'projects',
    'knowledge://projects',
    async (uri) => {
      const result = await client.listProjects();
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    },
  );
}
