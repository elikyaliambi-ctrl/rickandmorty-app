import { useFavorites } from "../hooks/useFavorites";

interface FavoritesPanelProps {
  onSelect: (id: number) => void;
}

// Den här panelen renderas en gång i App.tsx och syns oavsett om man
// tittar på listvyn eller detaljvyn. Den läser samma context som
// CharacterCard och CharacterDetail - det är det som bevisar att
// favoriterna faktiskt är delat state och inte bara två separata
// kopior som råkar se lika ut.
export function FavoritesPanel({ onSelect }: FavoritesPanelProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();

  return (
    <aside className="favorites-panel" aria-label="Mina favoriter">
      <h2>Mina favoriter ({favoriteIds.length})</h2>

      {favoriteIds.length === 0 ? (
        <p className="favorites-panel__empty">
          Inga favoriter än. Klicka på stjärnan på en karaktär.
        </p>
      ) : (
        <ul>
          {favoriteIds.map((id) => (
            <li key={id}>
              <button type="button" onClick={() => onSelect(id)}>
                Karaktär #{id}
              </button>
              <button
                type="button"
                className="favorites-panel__remove"
                onClick={() => toggleFavorite(id)}
                aria-label={`Ta bort karaktär ${id} från favoriter`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
