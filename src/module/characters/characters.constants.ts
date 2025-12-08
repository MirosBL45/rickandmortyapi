import type { DefaultOptionType } from "antd/es/select";

export const LIFE_STATUS_OPTIONS: DefaultOptionType[] = [
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];

export const GENDER_STATUS_OPTIONS: DefaultOptionType[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "genderless", label: "Genderless" },
  { value: "unknown", label: "Unknown" },
];

export const CHARACTER_API_URL = "https://rickandmortyapi.com/api/character";
