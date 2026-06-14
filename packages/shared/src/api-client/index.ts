export interface ApiClientOptions {
  baseUrl: string;
  token?: string;
}

export function createApiClient({ baseUrl, token }: ApiClientOptions) {
  const headers = (): HeadersInit => ({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  });

  async function get<T>(path: string): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, { headers: headers() });
    if (!res.ok) throw await res.json();
    return res.json();
  }

  async function post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  }

  async function patch<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  }

  async function del<T>(path: string): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'DELETE',
      headers: headers(),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  }

  return { get, post, patch, delete: del };
}
