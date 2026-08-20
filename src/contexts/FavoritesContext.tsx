import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { FavoritesContextValue } from '../types';

const defaultValue: FavoritesContextValue = {
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false
};

const FavoritesContext = createContext<FavoritesContextValue>(defaultValue);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => (prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]));
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
