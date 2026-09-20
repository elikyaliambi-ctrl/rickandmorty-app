import { apiGet } from "./client";
import type { Character, CharacterListResponse } from "../types";


export function fetchCharacters(page: number): Promise<CharacterListResponse> {
  return apiGet<CharacterListResponse>(`/character?page=${page}`);
}

export function fetchCharacterById(id: number): Promise<Character> {
  return apiGet<Character>(`/character/${id}`);
}
