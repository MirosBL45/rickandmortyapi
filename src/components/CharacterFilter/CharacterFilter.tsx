import { Input, Select } from "antd";
import { observer } from "mobx-react-lite";
import { useCharacterStore } from "../../context/CharacterContext";
import { useEffect } from "react";
import debounce from "lodash.debounce";

import styles from "./CharacterFilter.module.scss";

const CharacterFilter = observer(() => {
  const store = useCharacterStore();

  // Debounce za "name" i "species"
  const debouncedSetFilter = debounce((filterObj: any) => {
    store.setFilter(filterObj);
  }, 500);

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
          value={store.search}
          // onChange={(e) => handleFilterChange("name", e.target.value)}
          onChange={(e) => store.setFilter({name: e.target.value})} // added before - after
          allowClear
          onClear={() => handleFilterChange("name", "")}
        />
      </div>

      {/* Filter by species */}
      <div>
        <Input
          placeholder="Species..."
          value={store.species}
          // onChange={(e) => handleFilterChange("species", e.target.value)}
          onChange={(e) => store.setFilter({species: e.target.value})} // added before - after
          allowClear
          onClear={() => handleFilterChange("species", "")}
        />
      </div>

      {/* Filter by status */}
      <div>
        <Select
          placeholder="Status"
          value={store.status || undefined}
          // onChange={(value) => handleFilterChange("status", value)}
          onChange={(value) => store.setFilter({ status: value || "" })} // added before - after
          allowClear
          onClear={() => handleFilterChange("status", "")}
          options={[
            { value: "alive", label: "Alive" },
            { value: "dead", label: "Dead" },
            { value: "unknown", label: "Unknown" },
          ]}
        />
      </div>

      {/* Filter by gender */}
      <div>
        <Select
          placeholder="Gender"
          value={store.gender || undefined}
          // onChange={(value) => handleFilterChange("gender", value)}
          onChange={(value) => store.setFilter({ gender: value || "" })} // added before - after
          allowClear
          onClear={() => handleFilterChange("gender", "")}
          options={[
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
            { value: "genderless", label: "Genderless" },
            { value: "unknown", label: "Unknown" },
          ]}
        />
      </div>
    </div>
  );
});

export default CharacterFilter;
