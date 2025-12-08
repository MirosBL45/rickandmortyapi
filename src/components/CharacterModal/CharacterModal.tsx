import { Modal, Button } from "antd";
import { observer } from "mobx-react-lite";
import { useCharacterStore } from "../../module/characters/character.context";

import styles from './CharacterModal.module.scss';

const CharacterModal = observer(() => {
  const store = useCharacterStore();
  const cha = store.selected;

  if (!cha) return null;

  const isFavorite = store.favorites.some((fav) => fav.id === cha.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      store.removeFavorite(cha.id);
    } else {
      store.addFavorite(cha);
    }
  };

  return (
    <Modal
      open={!!cha}
      onCancel={() => store.selectCharacter(null)}
      footer={null}
      title={cha.name}
    >
      <div className={styles.modalBox}>
        <img src={cha.image} alt={cha.name} />
        <p>
          <strong>Gender:</strong> {cha.gender}
        </p>
        <p>
          <strong>Species:</strong> {cha.species}
        </p>
        <p>
          <strong>Location:</strong> {cha.location.name}
        </p>

        <Button
          type={isFavorite ? "default" : "primary"}
          danger={isFavorite}
          onClick={toggleFavorite}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </div>
    </Modal>
  );
});

export default CharacterModal;
