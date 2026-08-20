import { useEffect, useState } from 'react';
import Card from '../components/Card';
import CategoryFilter from '../components/CategoryFilter';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import SearchBar from '../components/SearchBar';
import { getEvents } from '../data/events';

const nextId = events =>
  events.length === 0 ? 1 : Math.max(...events.map(event => event.id)) + 1;

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(data => setEvents(data))
      .catch(() => setError('Could not load the events'))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = newEvent => {
    setEvents([...events, { id: nextId(events), ...newEvent }]);
  };

  const visibleEvents = events.filter(event => {
    const matchesQuery = event.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'all' || event.category === category;
    return matchesQuery && matchesCategory;
  });

  if (loading) return <p className="empty">Loading events...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <Card title="Find an event">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter value={category} onChange={setCategory} />
      </Card>
      <EventList events={visibleEvents} emptyMessage="No events match your search." />
      <Card title="Add a new event">
        <EventForm onCreate={handleCreate} />
      </Card>
    </>
  );
};

export default HomePage;
