import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { GatewayClient } from '../gateway-client.js';

export function registerMemoryTools(server: McpServer, client: GatewayClient): void {
  server.registerTool(
    'save_memory',
    {
      description:
        'Save new information to the project long-term memory. ' +
        'The system will analyze the information and decide whether to insert a new memory, ' +
        'update an existing one, or ignore if already known. ' +
        'Use this to persist important facts, decisions, user preferences, or context across conversations. ' +
        'Requires API key with memory:write scope.',
      inputSchema: {
        information: z.string().describe('The new information to memorize'),
        source: z
          .string()
          .default('agent')
          .describe('Source of the memory (e.g. agent, user, system)'),
      },
    },
    async ({ information, source }) => {
      const result = await client.saveMemory(information, source);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );

  server.registerTool(
    'recall_memory',
    {
      description:
        'Recall relevant long-term memories from the project knowledge base. ' +
        'Uses semantic similarity to find the most relevant stored memories. ' +
        'Use this to retrieve previously saved facts, decisions, or context. ' +
        'Requires API key with memory:read scope.',
      inputSchema: {
        query: z.string().describe('Query to search for relevant memories'),
        limit: z
          .number()
          .optional()
          .default(10)
          .describe('Maximum number of memories to return (default: 10)'),
      },
    },
    async ({ query, limit }) => {
      const result = await client.recallMemory(query, limit);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    },
  );
}
