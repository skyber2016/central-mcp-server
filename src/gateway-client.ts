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

  async search(query: string, limit: number = 5): Promise<unknown> {
    const { data } = await this.http.post('/search', { query, limit });
    return data;
  }

  async rag(question: string): Promise<unknown> {
    const { data } = await this.http.post('/rag', { query: question });
    return data;
  }

  async listProjects(): Promise<unknown> {
    const { data } = await this.http.get('/projects');
    return data;
  }

  async listDocuments(projectId?: string): Promise<unknown> {
    const params = projectId ? { projectId } : {};
    const { data } = await this.http.get('/admin/documents', { params });
    return data;
  }

  async indexDocument(title: string, content: string, source: string): Promise<unknown> {
    const { data } = await this.http.post('/documents/index', { title, content, source });
    return data;
  }

  async getJobStatus(jobId: string): Promise<unknown> {
    const { data } = await this.http.get(`/documents/jobs/${jobId}`);
    return data;
  }
}
