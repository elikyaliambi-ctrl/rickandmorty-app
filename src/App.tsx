import { useState } from "react";
import { CharacterList } from "./components/CharacterList";
import { CharacterDetail } from "./components/CharacterDetail";
import { FavoritesPanel } from "./components/FavoritesPanel";
import "./App.css";

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Rick and Morty explorer</h1>
        <p>Bläddra bland karaktärer och spara dina favoriter.</p>
      </header>

      <div className="app-layout">
        <main className="app-main">
          {selectedId === null ? (
            <CharacterList onSelect={setSelectedId} />
          ) : (
            <CharacterDetail
              characterId={selectedId}
              onBack={() => setSelectedId(null)}
            />
          )}
        </main>

        <FavoritesPanel onSelect={setSelectedId} />
      </div>
    </div>
  );
}
