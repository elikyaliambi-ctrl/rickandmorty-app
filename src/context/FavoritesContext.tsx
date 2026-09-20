import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

// Det här är appens delade state. Listvyn, detaljvyn och
// favoritpanelen i headern läser och ändrar samma favoriteIds-array
// via den här context:en (se hooks/useFavorites.ts), utan att skicka
// props genom flera lager. Ändrar man en favorit i listvyn syns det
// direkt i detaljvyn och i panelen, eftersom alla tre pratar med
// samma Provider.

export interface FavoritesContextValue {
  favoriteIds: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  }, []);

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds],
  );

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite }),
    [favoriteIds, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
