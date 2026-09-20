export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterLocationRef {
  name: string;
  url: string;
}

export type CharacterStatus = "Alive" | "Dead" | "unknown";

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: string;
  origin: CharacterLocationRef;
  location: CharacterLocationRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterListResponse {
  info: ApiInfo;
  results: Character[];
}
