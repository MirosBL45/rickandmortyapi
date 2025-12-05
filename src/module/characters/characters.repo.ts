import axios from "axios";
import type { ICreateCharacterPayload } from "./characters.service";

class CharacterRepo {
  baseURL = "characters";

  getCharacters = (params: any) => {
    return axios.get(this.baseURL, params);
  };

  getSingleCharacter = (params: any) => {
    return axios.get(this.baseURL, params);
  };

  createCharacter = (character: ICreateCharacterPayload) => {
    return axios.post(this.baseURL, character);
  };
}

export const characterRepo = new CharacterRepo();
