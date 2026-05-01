
import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './interfaces/event.interface';
import { QueryEventsDto } from './dto/query-events.dto';
import eventsData from '../data/events.json'

@Injectable()
export class EventsService {
  private readonly events: Event[] = eventsData as Event[];

  getEvents(query: QueryEventsDto): {
    data: Event[];
    meta: { total: number; page: number; limit: number; totalPages: number };
  } {
    let results = [...this.events];


    if (query.search) {
      const term = query.search.toLowerCase();
      results = results.filter(
        (e) =>
          e.name.toLowerCase().includes(term) ||
          e.venue.toLowerCase().includes(term),
      );
    }

    if (query.category) {
      results = results.filter((e) => e.category === query.category);
    }

    if (query.date_from) {
      const from = new Date(query.date_from);
      results = results.filter((e) => new Date(e.date) >= from);
    }

    if (query.date_to) {
      const to = new Date(query.date_to);
      results = results.filter((e) => new Date(e.date) <= to);
    }


    const page = query.page ?? 1;
    const limit = query.limit ?? 12;
    const total = results.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;

    const data = results.slice(offset, offset + limit);

    return {
      data,
      meta: { total, page, limit, totalPages },
    };
  }

  getEventbyId(id: string): Event {
    const event = this.events.find((e) => e.id === id);

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return event;
  }
}