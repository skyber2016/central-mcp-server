#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { GatewayClient } from './gateway-client.js';
import { registerSearchTool } from './tools/search.js';
import { registerRagTool } from './tools/rag.js';
import { registerProjectsTool } from './tools/projects.js';
import { registerDocumentsTools } from './tools/documents.js';
import { registerKnowledgeGraphsTools } from './tools/knowledge_graphs.js';
import { registerJobsTool } from './tools/jobs.js';
import { registerResources } from './resources/index.js';
import { registerPrompts } from './prompts/index.js';

const CKG_API_URL = process.env['CKG_API_URL'] ?? 'http://localhost:3000';
const CKG_API_KEY = process.env['CKG_API_KEY'];

if (!CKG_API_KEY) {
  console.error('CKG_API_KEY environment variable is required');
  process.exit(1);
}

const server = new McpServer({
  name: 'central-knowledge-gateway',
  version: '1.0.0',
});

const client = new GatewayClient(CKG_API_URL, CKG_API_KEY);

registerSearchTool(server, client);
registerRagTool(server, client);
registerProjectsTool(server, client);
registerDocumentsTools(server, client);
registerKnowledgeGraphsTools(server, client);
registerJobsTool(server, client);
registerResources(server, client);
registerPrompts(server);

const transport = new StdioServerTransport();
await server.connect(transport);

console.error(`Central Knowledge Gateway MCP server running (api=${CKG_API_URL})`);

