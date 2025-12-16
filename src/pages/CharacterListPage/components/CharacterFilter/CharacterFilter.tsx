import { Input, Select } from "antd";
import { observer } from "mobx-react-lite";
import { useCharacterStore } from "@/module/characters/character.context";
import { useEffect } from "react";
import debounce from "lodash.debounce";

import {
  LIFE_STATUS_OPTIONS,
  GENDER_STATUS_OPTIONS,
} from "@/module/characters/characters.constants";

import styles from "./CharacterFilter.module.scss";
import type { ICharacterFilters } from "@/module/characters/characters.types";

const CharacterFilter = observer(() => {
  const store = useCharacterStore();

  // Debounce za "name" i "species"
  const debouncedSetFilter = debounce(
    (filterObj: Partial<ICharacterFilters>) => {
      store.setFilter(filterObj);
    },
    500
  );

  useEffect(() => {
    return () => debouncedSetFilter.cancel();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    if (key === "name" || key === "species") {
      debouncedSetFilter({ [key]: value });
    } else {
      store.setFilter({ [key]: value });
    }
  };

  return (
    <div className={styles.characterFilters}>
      {/* Filter by name */}
      <div>
        <Input
          placeholder="Search by name..."
          value={store.filters.name}
          onChange={(e) => store.setFilter({ name: e.target.value })} // added before - after
          allowClear
          onClear={() => handleFilterChange("name", "")}
        />
      </div>

      {/* Filter by species */}
      <div>
        <Input
          placeholder="Species..."
          value={store.filters.species}
          onChange={(e) => store.setFilter({ species: e.target.value })} // added before - after
          allowClear
          onClear={() => handleFilterChange("species", "")}
        />
      </div>

      {/* Filter by status */}
      <div>
        <Select
          placeholder="Status"
          value={store.filters.status || undefined}
          onChange={(value) => store.setFilter({ status: value || "" })} // added before - after
          allowClear
          onClear={() => handleFilterChange("status", "")}
          options={LIFE_STATUS_OPTIONS}
        />
      </div>

      {/* Filter by gender */}
      <div>
        <Select
          placeholder="Gender"
          value={store.filters.gender || undefined}
          onChange={(value) => store.setFilter({ gender: value || "" })} // added before - after
          allowClear
          onClear={() => handleFilterChange("gender", "")}
          options={GENDER_STATUS_OPTIONS}
        />
      </div>
    </div>
  );
});

export default CharacterFilter;
