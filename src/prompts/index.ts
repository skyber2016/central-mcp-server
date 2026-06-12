import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

export function registerPrompts(server: McpServer): void {
  server.prompt(
    'architecture-review',
    'Review a feature using indexed project knowledge and identify architectural concerns',
    { feature: z.string().describe('The feature or component to review') },
    ({ feature }) => ({
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Review the feature "${feature}" using indexed project knowledge and identify architectural concerns, inconsistencies, and recommendations. Use the search_documents and ask_rag tools to retrieve relevant context before providing your analysis.`,
          },
        },
      ],
    }),
  );

  server.prompt(
    'impact-analysis',
    'Analyze potential impact of changes to a module',
    { module: z.string().describe('The module to analyze') },
    ({ module }) => ({
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Analyze the potential impact of changes to the "${module}" module using indexed project knowledge. Summarize affected areas, dependencies, and risks. Use the search_documents and ask_rag tools to retrieve relevant context.`,
          },
        },
      ],
    }),
  );

  server.prompt(
    'implementation-guide',
    'Generate implementation guidance for a feature',
    { feature: z.string().describe('The feature to implement') },
    ({ feature }) => ({
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Generate implementation guidance for the "${feature}" feature using indexed specifications and existing project patterns. Use the search_documents and ask_rag tools to retrieve relevant context. Include code patterns, architectural decisions, and step-by-step instructions.`,
          },
        },
      ],
    }),
  );
}
