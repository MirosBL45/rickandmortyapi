import { observer } from "mobx-react-lite";
import { Pagination, Spin } from "antd";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import { useCharacterStore } from "@/module/characters/character.context";

import styles from './CharacterList.module.scss';

const CharacterList = observer(() => {
  const store = useCharacterStore();

  if (store.loading) return <Spin size="large" />;

  return (
    <section className={styles.characterListSection}>
      {store.error && <p>{store.error}</p>}

      <div className={styles.characterListGrid}>
        {store.characters.map((cha) => (
          <CharacterCard key={cha.id} character={cha} />
        ))}
      </div>

      <div className={styles.paginationPart}>
        <Pagination
          current={store.page}
          pageSize={20}
          total={store.total}
          onChange={(page) => store.setPage(page)}
        />
      </div>
    </section>
  );
});

export default CharacterList;
