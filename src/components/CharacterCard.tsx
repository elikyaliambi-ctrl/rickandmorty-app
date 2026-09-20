import type { Character } from "../types";
import { useFavorites } from "../hooks/useFavorites";
import { StatusDot } from "./StatusDot";

interface CharacterCardProps {
  character: Character;
  onSelect: (id: number) => void;
}

export function CharacterCard({ character, onSelect }: CharacterCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  return (
    <li className="character-card">
      <button
        type="button"
        className="character-card__body"
        onClick={() => onSelect(character.id)}
      >
        <img src={character.image} alt={character.name} />
        <div>
          <h3>{character.name}</h3>
          <p>
            <StatusDot status={character.status} /> {character.status} –{" "}
            {character.species}
          </p>
        </div>
      </button>

      <button
        type="button"
        className={`favorite-toggle${favorite ? " is-favorite" : ""}`}
        onClick={() => toggleFavorite(character.id)}
        aria-pressed={favorite}
        aria-label={
          favorite
            ? `Ta bort ${character.name} från favoriter`
            : `Lägg till ${character.name} som favorit`
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </li>
  );
}
