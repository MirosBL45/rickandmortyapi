import { characterRepo } from "./characters.repo";

export interface ICreateCharacterFormValues {
  isAllMonths: true | false;
}

export interface ICreateCharacterPayload {
  date: "ALL_MONTHS" | null;
}

class CharactersService {
  getCharacters = (params: ICreateCharacterPayload) => {
    return characterRepo.getCharacters(params);
  };

  getSingleCharacter = (params: any) => {
    const validPayload = { ...params, date: "ALL_MONTHS" };
    return characterRepo.getSingleCharacter(params);
  };

  createCharacter = (params: ICreateCharacterFormValues) => {
    const validParams = this.parseCreateCharacterPayload(params);
    return characterRepo.createCharacter(params);
  };

  private parseCreateCharacterPayload = (
    formValues: ICreateCharacterFormValues
  ): ICreateCharacterPayload => {
    const validPayload = { date: formValues.isAllMonths ? "ALL_MONTH" : null };
    return validPayload;
  };
}

export const charactersService = new CharactersService();
