import { createContext, useContext, useState } from 'react';
const defaultValue = {
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false
};

const FavoritesContext = createContext(defaultValue);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = id => {
    setFavorites(prev => (prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]));
  };

  const isFavorite = id => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
