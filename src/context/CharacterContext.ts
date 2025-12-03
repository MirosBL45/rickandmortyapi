import { createContext, useContext } from "react";
import { characterStore } from "../store/CharacterStore";

export const CharacterContext = createContext(characterStore);

export const useCharacterStore = () => useContext(CharacterContext);