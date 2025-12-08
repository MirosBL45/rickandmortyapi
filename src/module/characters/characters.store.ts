import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import debounce from "lodash.debounce"; // added before - after

import type { ICharacter, ICharacterFilters } from "./characters.types";

class CharacterStore {
  characters: ICharacter[] = [];
  loading = false;
  error = "";
  page = 1;
  total = 0;
  pageSize = 20;

  // Filters
  // name = '';
  // status = '';
  // species = '';
  // gender = '';
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
    this.filters = {
      ...this.filters,
      ...filter,
    };

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

    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character",
        {
          params: {
            page: this.page,
            name: this.filters.name || undefined,
            status: this.filters.status || undefined,
            species: this.filters.species || undefined,
            gender: this.filters.gender || undefined,
          },
        }
      );

      runInAction(() => {
        this.characters = response.data.results;
        this.total = response.data.info.count;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = "Not found";
        this.characters = [];
        this.total = 0;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
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
  updateFavorite(updated: {
    id: number;
    name: string;
    species: string;
    status: string;
    gender: string;
  }) {
    this.favorites = this.favorites.map((fav) =>
      fav.id === updated.id ? { ...fav, ...updated } : fav
    );

    this.saveFavorites();
    this.closeEditModal();
  }
}

export const characterStore = new CharacterStore();
