import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { GatewayClient } from '../gateway-client.js';

export function registerResources(server: McpServer, client: GatewayClient): void {
  server.registerResource(
    'documents',
    'knowledge://documents',
    { description: 'List of all indexed documents in the gateway' },
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

  server.registerResource(
    'projects',
    'knowledge://projects',
    { description: 'List of all projects in the Knowledge Gateway' },
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
