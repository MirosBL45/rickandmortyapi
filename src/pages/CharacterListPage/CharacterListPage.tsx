import CharacterFilter from "../../components/CharacterFilter/CharacterFilter";
import { Suspense, lazy } from "react";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import styles from "./CharacterListPage.module.scss";
import { characterStore } from "../../module/characters/characters.store";

const CharacterList = lazy(
  () => import("../../components/CharacterList/CharacterList")
);
const CharacterModal = lazy(
  () => import("../../components/CharacterModal/CharacterModal")
);

const CharacterListPage = observer(() => {
  useEffect(() => {
    characterStore.fetchCharacters();
  }, []);

  return (
    <div>
      <CharacterFilter />
      <section className={styles.characterSection}>
        <h1>Character List</h1>
        <Suspense fallback={<div>Loading, Loading components......</div>}>
          <CharacterList />
          <CharacterModal />
        </Suspense>
      </section>
    </div>
  );
});

export default CharacterListPage;
