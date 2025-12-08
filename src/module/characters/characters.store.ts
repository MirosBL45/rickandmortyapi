import { makeAutoObservable, runInAction } from "mobx";
import debounce from "lodash.debounce"; // added before - after

import type {
  ICharacter,
  ICharacterFilters,
  IUpdateCharacter,
} from "./characters.types";

import { charactersService } from "./characters.service";

import to from "await-to-js";

class CharacterStore {
  characters: ICharacter[] = [];
  loading = false;
  error = "";
  page = 1;
  total = 0;
  pageSize = 20;

  filters: ICharacterFilters = {
    name: "",
    status: "",
    species: "",
    gender: "",
  };

  selected: ICharacter | null = null;

  // Favorites
  favorites: ICharacter[] = [];

  // Edit Modal
  editCharacterId: number | null = null;
  debouncedFetch: () => void; // added before - after

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
    this.debouncedFetch = debounce(this.fetchCharacters.bind(this), 500); // added before - after
  }

  // Set filters
  setFilter(filter: Partial<ICharacterFilters>) {
    this.filters = charactersService.parseFilters({
      ...this.filters,
      ...filter,
    });

    this.page = 1;
    // this.fetchCharacters();
    this.debouncedFetch(); // added before - after
  }

  setPage(page: number) {
    this.page = page;
    this.fetchCharacters();
  }

  setPageSize(size: number) {
    this.pageSize = size;
    this.page = 1;
    this.fetchCharacters();
  }

  selectCharacter(character: ICharacter | null) {
    this.selected = character;
  }

  async fetchCharacters() {
    this.loading = true;
    this.error = "";

    const [err, response] = await to(
      charactersService.getCharacters(this.filters, this.page, this.pageSize)
    );

    runInAction(() => {
      if (err) {
        this.error = "Not found";
        this.characters = [];
        this.total = 0;
        this.loading = false;
        return;
      }

      this.characters = response.data.results;
      this.total = response.data.info.count;
      this.loading = false;
    });
  }

  // --- FAVORITES ---

  addFavorite(character: ICharacter) {
    if (!this.favorites.find((fav) => fav.id === character.id)) {
      this.favorites.push(character);
      this.saveFavorites();
    }
  }

  removeFavorite(characterId: number) {
    this.favorites = this.favorites.filter((fav) => fav.id !== characterId);
    this.saveFavorites();
  }

  saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  loadFavorites() {
    const data = localStorage.getItem("favorites");
    if (data) {
      this.favorites = JSON.parse(data);
    }
  }

  // --- EDIT FAVORITE LOGIC ---

  // Otvara modal za edit
  openEditModal(id: number) {
    this.editCharacterId = id;
  }

  setCharacterToEdit(id: number) {
    this.openEditModal(id);
  }

  // Zatvara modal
  closeEditModal() {
    this.editCharacterId = null;
  }

  // Čuva izmene
  updateFavorite(updated: IUpdateCharacter) {
    this.favorites = this.favorites.map((fav) =>
      fav.id === updated.id ? { ...fav, ...updated } : fav
    );

    this.saveFavorites();
    this.closeEditModal();
  }
}

export const characterStore = new CharacterStore();
