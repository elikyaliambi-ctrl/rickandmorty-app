# Rick and Morty Explorer

Liten React + TypeScript-app byggd som komplettering i kursen
Frontendutveckling med ramverk. Appen visar karaktärer från det publika
[Rick and Morty API](https://rickandmortyapi.com/) i en listvy och en
detaljvy, och låter dig spara karaktärer som favoriter över båda vyerna.

## Köra appen lokalt

```bash
npm install
npm run dev
```

Öppna sedan adressen terminalen visar (normalt http://localhost:5173).

```bash
npm run build    # produktionsbygge, inkluderar typkontroll (tsc -b)
npm run lint     # oxlint
npm run preview  # förhandsgranska produktionsbygget
```

## Struktur

```
src/
  api/
    client.ts         # enda stället som känner till bas-URL:en och fetch
    characters.ts      # fetchCharacters(page), fetchCharacterById(id)
  hooks/
    useFetch.ts         # generisk hook: { data, loading, error }
    useFavorites.ts      # läser/skriver det delade favorit-statet
  context/
    FavoritesContext.tsx # FavoritesProvider + själva context-objektet
  components/
    CharacterList.tsx    # listvy
    CharacterDetail.tsx  # detaljvy
    CharacterCard.tsx    # ett kort i listan, med favorit-knapp
    FavoritesPanel.tsx   # panel som visar favoriterna, synlig i båda vyerna
    Loader.tsx / ErrorMessage.tsx / StatusDot.tsx
  App.tsx                # växlar mellan listvy och detaljvy
  main.tsx                # monterar appen, wrappar allt i FavoritesProvider
```

## Hur data flödar genom appen

1. En komponent (t.ex. `CharacterList`) anropar `useFetch(() => fetchCharacters(page), [page])`.
2. `useFetch` (i `hooks/useFetch.ts`) är en generisk hook som inte vet
   något om Rick and Morty. Den kör bara funktionen den får in, och
   håller reda på tre lägen: `loading: true` medan anropet pågår,
   `error` om det kastar ett fel, annars `data` med resultatet.
3. `fetchCharacters` (i `api/characters.ts`) bygger rätt URL och
   anropar `apiGet` i `api/client.ts`, som är det enda stället i hela
   appen som faktiskt gör ett `fetch(...)`-anrop och tolkar svaret.
4. Komponenten renderar utifrån vilket av de tre lägena den just nu
   är i: en `Loader`, ett `ErrorMessage`, eller listan/detaljerna.

Alltså: **anrop → `api/`-modul → `useFetch` → komponent**. Ingen
komponent gör ett fetch-anrop själv, och ingen fetch-logik ligger
inbakad i JSX:en.

## Delat state (favoriter)

`favoriteIds` (en array med karaktärs-id:n) bor i `FavoritesContext`
och tillhandahålls av `FavoritesProvider` som wrappar hela appen i
`main.tsx`. Tre olika ställen läser och skriver till samma state via
hooken `useFavorites()`:

- `CharacterCard` (i listvyn) – togglar favorit på ett kort.
- `CharacterDetail` (detaljvyn) – togglar favorit på den öppna karaktären.
- `FavoritesPanel` (syns i båda vyerna, renderas en gång i `App.tsx`) – visar hela listan av favoriter och låter dig hoppa till en av dem.

Eftersom alla tre pratar med samma `FavoritesContext.Provider` istället
för att få statet skickat som props flera nivåer ner, syns en ändring
i en vy direkt i de andra – testa att lägga till en favorit i listan
och byt sedan till detaljvyn, eller titta på panelen till höger.

`selectedId` (vilken karaktär som är öppen) ligger däremot bara som
vanligt `useState` i `App.tsx`, eftersom det bara skickas ett enda
steg ner till `CharacterList`/`CharacterDetail` – ingen anledning att
lägga det i context.

## Testa fel-läget

Öppna devtools → Network → sätt till "Offline" (eller stäng av
nätverket) och ladda om sidan, eller byt sida/karaktär. `ErrorMessage`
ska då visas istället för listan/detaljerna.
