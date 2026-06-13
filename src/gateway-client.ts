import axios, { AxiosInstance } from 'axios';

export class GatewayClient {
  private readonly http: AxiosInstance;

  constructor(baseUrl: string, apiKey: string) {
    this.http = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 60000,
    });
  }

  // ── Search ─────────────────────────────────────────────────
  async search(query: string, limit: number = 5): Promise<unknown> {
    const { data } = await this.http.post('/mcp/search', { query, limit });
    return data;
  }

  // ── RAG ────────────────────────────────────────────────────
  async rag(question: string): Promise<unknown> {
    const { data } = await this.http.post('/mcp/rag', { query: question });
    return data;
  }

  // ── Documents ──────────────────────────────────────────────
  async indexDocument(title: string, content: string, source: string): Promise<unknown> {
    const { data } = await this.http.post('/mcp/documents/index', { title, content, source });
    return data;
  }

  async getJobStatus(jobId: string): Promise<unknown> {
    const { data } = await this.http.get(`/mcp/documents/jobs/${jobId}`);
    return data;
  }

  // ── Memory ─────────────────────────────────────────────────
  async saveMemory(newInformation: string, source: string = 'agent'): Promise<unknown> {
    const { data } = await this.http.post('/mcp/memory/save', {
      new_information: newInformation,
      source,
    });
    return data;
  }

  async recallMemory(query: string, limit: number = 10): Promise<unknown> {
    const { data } = await this.http.post('/mcp/memory/recall', { query, limit });
    return data;
  }
}
