import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { useCharacterStore } from "../../module/characters/character.context";
import debounce from 'lodash.debounce';
import { useCallback } from 'react';

const SearchBar = observer(() => {
  const store = useCharacterStore();

  const debouncedSetFilter = useCallback(
    debounce((value: string) => {
      store.setFilter({ name: value });
    }, 500),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      store.setFilter({ name: '' });
    } else {
      debouncedSetFilter(value);
    }
  };

  return (
    <Input.Search
      placeholder="Search characters..."
      allowClear
      onSearch={(value: any) => store.setFilter({ name: value })}
      onChange={handleChange}
    />
  );
});

export default SearchBar;
