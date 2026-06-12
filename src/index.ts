#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { GatewayClient } from './gateway-client.js';
import { registerSearchTool } from './tools/search.js';
import { registerRagTool } from './tools/rag.js';
import { registerProjectsTool } from './tools/projects.js';
import { registerDocumentsTools } from './tools/documents.js';
import { registerJobsTool } from './tools/jobs.js';
import { registerResources } from './resources/index.js';
import { registerPrompts } from './prompts/index.js';

const KGW_API_URL = process.env['KGW_API_URL'] ?? 'http://localhost:3000';
const KGW_API_KEY = process.env['KGW_API_KEY'];

if (!KGW_API_KEY) {
  console.error('KGW_API_KEY environment variable is required');
  process.exit(1);
}

const server = new McpServer({
  name: 'knowledge-gateway',
  version: '1.0.0',
});

const client = new GatewayClient(KGW_API_URL, KGW_API_KEY);

registerSearchTool(server, client);
registerRagTool(server, client);
registerProjectsTool(server, client);
registerDocumentsTools(server, client);
registerJobsTool(server, client);
registerResources(server, client);
registerPrompts(server);

const transport = new StdioServerTransport();
await server.connect(transport);

console.error(`Knowledge Gateway MCP server running (api=${KGW_API_URL})`);
