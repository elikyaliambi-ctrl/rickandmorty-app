import { useState } from "react";
import { fetchCharacters } from "../api/characters";
import { useFetch } from "../hooks/useFetch";
import { CharacterCard } from "./CharacterCard";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";

interface CharacterListProps {
  onSelect: (id: number) => void;
}

export function CharacterList({ onSelect }: CharacterListProps) {
  const [page, setPage] = useState(1);

  // All hämtning går via useFetch + fetchCharacters. Komponenten vet
  // bara om tre lägen: loading, error och data - inget fetch-anrop
  // ligger inne i JSX:en.
  const { data, loading, error } = useFetch(
    () => fetchCharacters(page),
    [page],
  );

  return (
    <section aria-labelledby="character-list-heading">
      <h2 id="character-list-heading">Karaktärer</h2>

      {loading && <Loader label="Hämtar karaktärer..." />}
      {error && <ErrorMessage message={error} />}

      {data && (
        <>
          <ul className="character-grid">
            {data.results.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={onSelect}
              />
            ))}
          </ul>

          <div className="pagination">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={!data.info.prev}
            >
              Föregående
            </button>
            <span>
              Sida {page} av {data.info.pages}
            </span>
            <button
              type="button"
              onClick={() => setPage((current) => current + 1)}
              disabled={!data.info.next}
            >
              Nästa
            </button>
          </div>
        </>
      )}
    </section>
  );
}
