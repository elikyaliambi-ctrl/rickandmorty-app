// Enda stället i hela appen som känner till bas-URL:en och hur ett
// misslyckat svar ska tolkas. Alla andra moduler (och komponenter)
// pratar bara med funktioner i api/-mappen, aldrig direkt med fetch.

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
