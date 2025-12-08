import axios from "axios";
import type { ICharacterFilters } from "./characters.types";
import { CHARACTER_API_URL } from "./characters.constants";

class CharactersService {
  parseFilters(input: Partial<ICharacterFilters>): ICharacterFilters {
    return {
      name: input.name ?? "",
      status: input.status ?? "",
      species: input.species ?? "",
      gender: input.gender ?? "",
    };
  }

  async getCharacters(filters: ICharacterFilters, page: number, _pageSize: number) {
    return axios.get(CHARACTER_API_URL, {
      params: {
        page,
        name: filters.name || undefined,
        status: filters.status || undefined,
        species: filters.species || undefined,
        gender: filters.gender || undefined,
      },
    });
  }
}

export const charactersService = new CharactersService();
