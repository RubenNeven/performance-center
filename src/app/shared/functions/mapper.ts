import {EventDto} from '../models/dto';
import {type Event, EventType} from '../models/models';

export function mapEvent(eventDto: EventDto){
  const { id, name, distance, type, description, date } = eventDto;
  const event: Event = {
    id: id,
    name: name,
    distance: distance,
    type: mapEventType(type),
    description: description,
    date: new Date(date)
  }
  return event;
}

function mapEventType(eventType: string): EventType {
  const upper = eventType.toUpperCase();
  if (upper in EventType){
    return EventType[upper as keyof typeof EventType]
  } else {
    throw new Error(`Unknown event type: ${eventType}`);
  }
}

