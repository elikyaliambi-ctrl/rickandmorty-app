import { apiGet } from "./client";
import type { Character, CharacterListResponse } from "../types";

// Allt datahämtning för karaktärer samlas här. Komponenter och hooks
// importerar dessa funktioner istället för att bygga URL:er själva.
// Vill man lägga till ett nytt API-anrop imorgon (t.ex. hämta avsnitt)
// skapar man bara en ny funktion här enligt samma mönster.

export function fetchCharacters(page: number): Promise<CharacterListResponse> {
  return apiGet<CharacterListResponse>(`/character?page=${page}`);
}

export function fetchCharacterById(id: number): Promise<Character> {
  return apiGet<Character>(`/character/${id}`);
}
