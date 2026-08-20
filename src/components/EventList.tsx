import EventCard from './EventCard';

const EventList = ({ events, emptyMessage = 'Nothing to show here.' }) => {
  if (events.length === 0) return <p className="empty">{emptyMessage}</p>;

  return (
    <div className="event-list">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
