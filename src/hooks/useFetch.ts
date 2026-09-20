import { useEffect, useState, type DependencyList } from "react";

// Generisk hook som ger alla komponenter samma tre tillstånd:
// laddar / fel / resultat. Den vet ingenting om Rick and Morty-API:et,
// den bara kör den fetcher-funktion den får in och håller reda på
// status. Nytt API-anrop i appen = ny fetcher-funktion i api/-mappen,
// samma hook återanvänds.

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: DependencyList,
): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    fetcher()
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "Något oväntat gick fel";
          setState({ data: null, loading: false, error: message });
        }
      });

    return () => {
      cancelled = true;
    };
    // deps styr när anropet ska göras om (t.ex. ny sida eller nytt id).
    // Listan kommer in som en variabel (inte en literal array) eftersom
    // hooken är generisk, så statiska lint-regler kan inte se innehållet -
    // det är en avsiktlig, vanlig lösning för återanvändbara data-hooks.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
