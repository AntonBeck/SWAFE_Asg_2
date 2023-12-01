class RestService {

    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://afefitness2023.azurewebsites.net/api';
    }

    private getAuthToken(): string | null {
        return localStorage.getItem('jwtToken');
    }

    private getHeaders(): HeadersInit {
    const jwtToken = this.getAuthToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (jwtToken) {
        headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    return headers;
    }

    async makeRequest(endpoint: string, method: string, body?: any): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;
        try {
          const response = await fetch(url, {
            method: method,
            headers: this.getHeaders(),
            body: body ? JSON.stringify(body) : undefined,
          });
    
          if (!response.ok) {
            throw new Error(`Error making request to ${url}. Status: ${response.status}`);
          }
    
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(`Error making request to ${url}:`, error);
          throw error;
        }
    }
  }
  
  const restService = new RestService();
  export default restService;