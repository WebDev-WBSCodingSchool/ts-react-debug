import type { EventItem } from '../types';

const BASE_URL = '/db.json';

export const getEvents = async (): Promise<EventItem> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Could not load the events');
  const data: EventItem[] = await res.json();
  return data;
};

export const getEventById = async id => {
  const events = await getEvents();
  return events.find(event => event.id === id);
};
