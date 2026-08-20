import { useEffect, useState } from 'react';
import EventList from '../components/EventList';
import { useFavorites } from '../contexts/FavoritesContext';
import { getEvents } from '../data/events';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(data => setEvents(data));
  }, []);

  const favoriteEvents = events.filter(event => favorites.includes(event.id));

  return (
    <>
      <h2>Your favorites</h2>
      <EventList events={favoriteEvents} emptyMessage="You have not starred any event yet." />
    </>
  );
};

export default FavoritesPage;
