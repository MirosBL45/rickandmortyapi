import { createContext, useContext } from "react";
import { characterStore } from "../store/CharacterStore";

export const CharacterContext = createContext(characterStore);

export const useCharacterStore = () => useContext(CharacterContext);


// Todo: src/context je vise folder za neke globalne konteste, koji nisu vezani za module. npr filter.context, modal.context i slicno.

// Todo: prebaciti ovo u modules/character.context.ts