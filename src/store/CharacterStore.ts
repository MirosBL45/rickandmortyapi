import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import debounce from 'lodash.debounce'; // added before - after

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    location: { name: string };
}

class CharacterStore {
    characters: Character[] = [];
    loading = false;
    error = '';
    page = 1;
    total = 0;
    pageSize = 20;

    // Filters
    search = '';
    status = '';
    species = '';
    gender = '';

    selected: Character | null = null;

    // Favorites
    favorites: Character[] = [];

    // Edit Modal
    editCharacterId: number | null = null;
    debouncedFetch: () => void; // added before - after

    constructor() {
        makeAutoObservable(this);
        this.loadFavorites();
        this.debouncedFetch = debounce(this.fetchCharacters.bind(this), 500); // added before - after

    }

    // Set filters
    setFilter(filter: Partial<{ name: string; status: string; species: string; gender: string }>) {
        if (filter.name !== undefined) this.search = filter.name || '';
        if (filter.status !== undefined) this.status = filter.status || '';
        if (filter.species !== undefined) this.species = filter.species || '';
        if (filter.gender !== undefined) this.gender = filter.gender || '';

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

    selectCharacter(character: Character | null) {
        this.selected = character;
    }

    async fetchCharacters() {
        this.loading = true;
        this.error = '';

        try {
            const response = await axios.get("https://rickandmortyapi.com/api/character", {
                params: {
                    page: this.page,
                    name: this.search || undefined,
                    status: this.status || undefined,
                    species: this.species || undefined,
                    gender: this.gender || undefined,
                }
            });

            runInAction(() => {
                this.characters = response.data.results;
                this.total = response.data.info.count;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = 'Not found';
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

    addFavorite(character: Character) {
        if (!this.favorites.find(fav => fav.id === character.id)) {
            this.favorites.push(character);
            this.saveFavorites();
        }
    }

    removeFavorite(characterId: number) {
        this.favorites = this.favorites.filter(fav => fav.id !== characterId);
        this.saveFavorites();
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const data = localStorage.getItem('favorites');
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
        this.favorites = this.favorites.map(fav =>
            fav.id === updated.id ? { ...fav, ...updated } : fav
        );

        this.saveFavorites();
        this.closeEditModal();
    }
}

export const characterStore = new CharacterStore();
