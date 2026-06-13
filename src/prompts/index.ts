import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

export function registerPrompts(server: McpServer): void {
  server.registerPrompt(
    'architecture-review',
    {
      description: 'Review a feature using indexed project knowledge and identify architectural concerns',
      argsSchema: { feature: z.string().describe('The feature or component to review') }
    },
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

  server.registerPrompt(
    'impact-analysis',
    {
      description: 'Analyze potential impact of changes to a module',
      argsSchema: { module: z.string().describe('The module to analyze') }
    },
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

  server.registerPrompt(
    'implementation-guide',
    {
      description: 'Generate implementation guidance for a feature',
      argsSchema: { feature: z.string().describe('The feature to implement') }
    },
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

  server.registerPrompt(
    'knowledge-synthesis',
    {
      description: 'Synthesize knowledge from documents and long-term memory to answer a complex question',
      argsSchema: { topic: z.string().describe('The topic or question to synthesize knowledge about') }
    },
    ({ topic }) => ({
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Provide a comprehensive synthesis about "${topic}" by combining information from multiple sources:\n\n1. First, use search_documents to find relevant indexed documentation.\n2. Then, use recall_memory to retrieve any previously stored insights or decisions.\n3. Finally, use ask_rag to get an AI-generated answer grounded in the knowledge base.\n\nCombine all findings into a coherent, well-structured analysis. Highlight any conflicts or gaps between sources.`,
          },
        },
      ],
    }),
  );
}
