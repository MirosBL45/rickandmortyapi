import { Card } from "antd";
import { observer } from "mobx-react-lite";
import { type Character } from "../../store/CharacterStore";
import { useCharacterStore } from "../../context/CharacterContext";
import styles from './CharacterCard.module.scss';

const { Meta } = Card;

type Props = {
  character: Character;
  isFavoriteCard?: boolean;
  onRemove?: (id: number) => void;
};

const CharacterCard = observer(({ character, isFavoriteCard = false, onRemove }: Props) => {
  const store = useCharacterStore();

  return (
    <div className={`${styles.customCardWrapper} ${isFavoriteCard ? styles.favorite : ''}`}>
      <Card
        hoverable={!isFavoriteCard}
        cover={<img alt={character.name} src={character.image} />}
        onClick={() => !isFavoriteCard && store.selectCharacter(character)}
        className={styles.customCard}
      >
        <Meta title={character.name} description={character.species} />

        {isFavoriteCard && (
          <div className={styles.favoriteActions}>
            {/* EDIT */}
            <button
              className={styles.editBtn}
              onClick={(e) => {
                e.stopPropagation();
                store.openEditModal(character.id);
              }}
            >
              ✎
            </button>

            {/* REMOVE */}
            <button
              className={styles.removeBtn}
              onClick={(e) => {
                e.stopPropagation();
                onRemove && onRemove(character.id);
              }}
            >
              ✕
            </button>
          </div>
        )}
      </Card>
    </div>
  );
});

export default CharacterCard;
