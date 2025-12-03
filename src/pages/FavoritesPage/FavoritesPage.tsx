import { observer } from "mobx-react-lite";
import { useCharacterStore } from "../../context/CharacterContext";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import EditCharacterModal from "../../components/EditCharacterModal/EditCharacterModal";

import styles from './FavoritesPage.module.scss';

const FavoritesPage = observer(() => {
  const store = useCharacterStore();

  return (
    <div className={styles.favoritesPage}>
      <h1>Your Favorite Characters</h1>

      {store.favorites.length === 0 ? (
        <p>You have no favorite characters yet.</p>
      ) : (
        <div className={styles.favoritesGrid}>
          {store.favorites.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isFavoriteCard
              onRemove={(id) => store.removeFavorite(id)}
            />
          ))}
        </div>
      )}

      <EditCharacterModal />
    </div>
  );
});

export default FavoritesPage;
