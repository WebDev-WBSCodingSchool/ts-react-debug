import { useFavorites } from '../contexts/FavoritesContext';

const FavoriteButton = ({ eventId }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(eventId);

  return (
    <button
      type="button"
      className={active ? 'fav active' : 'fav'}
      onClick={() => toggleFavorite(eventId)}
    >
      {active ? '★' : '☆'}
    </button>
  );
};

export default FavoriteButton;
