import { fetchCharacterById } from "../api/characters";
import { useFetch } from "../hooks/useFetch";
import { useFavorites } from "../hooks/useFavorites";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { StatusDot } from "./StatusDot";

interface CharacterDetailProps {
  characterId: number;
  onBack: () => void;
}

export function CharacterDetail({
  characterId,
  onBack,
}: CharacterDetailProps) {
  const { data, loading, error } = useFetch(
    () => fetchCharacterById(characterId),
    [characterId],
  );
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <section aria-labelledby="character-detail-heading">
      <button type="button" className="back-link" onClick={onBack}>
        ← Tillbaka till listan
      </button>

      {loading && <Loader label="Hämtar karaktär..." />}
      {error && <ErrorMessage message={error} />}

      {data && (
        <article className="character-detail">
          <img src={data.image} alt={data.name} />
          <div>
            <h2 id="character-detail-heading">{data.name}</h2>
            <p>
              <StatusDot status={data.status} /> {data.status} –{" "}
              {data.species}
            </p>
            <p>Kön: {data.gender}</p>
            <p>Ursprung: {data.origin.name}</p>
            <p>Senast sedd: {data.location.name}</p>
            <p>Antal avsnitt med karaktären: {data.episode.length}</p>

            <button
              type="button"
              className={`favorite-toggle favorite-toggle--large${
                isFavorite(data.id) ? " is-favorite" : ""
              }`}
              onClick={() => toggleFavorite(data.id)}
              aria-pressed={isFavorite(data.id)}
            >
              {isFavorite(data.id) ? "★ Favorit" : "☆ Lägg till som favorit"}
            </button>
          </div>
        </article>
      )}
    </section>
  );
}
