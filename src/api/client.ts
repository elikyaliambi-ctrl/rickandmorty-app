const BASE_URL = "https://rickandmortyapi.com/api";

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(
      `Anropet till ${path} misslyckades med status ${response.status}`,
    );
  }

  return (await response.json()) as T;
}
