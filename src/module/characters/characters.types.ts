export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: {
    name: string;
  };
}

export interface ICharacterFilters {
  name: string;
  status: string;
  species: string;
  gender: string;
}

export interface IUpdateCharacter {
  id: number;
  name: string;
  species: string;
  status: string;
  gender: string;
}