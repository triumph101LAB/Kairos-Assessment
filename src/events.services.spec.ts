import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EventsService } from './events/event.services';

describe('EventsService - getEventById', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  describe('when a valid id is provided', () => {
    it('should return the matching event', () => {
      const event = service.getEventbyId('evt-001');

      expect(event).toBeDefined();
      expect(event.id).toBe('evt-001');
      expect(event.name).toBe('Downtown Jazz Night');
    });

    it('should return the full event shape', () => {
      const event = service.getEventbyId('evt-001');

      expect(event).toHaveProperty('id');
      expect(event).toHaveProperty('name');
      expect(event).toHaveProperty('description');
      expect(event).toHaveProperty('category');
      expect(event).toHaveProperty('date');
      expect(event).toHaveProperty('venue');
      expect(event).toHaveProperty('organizer');
      expect(event).toHaveProperty('spots_remaining');
    });

    it('should return the correct organizer info', () => {
      const event = service.getEventbyId('evt-001');

      expect(event.organizer).toBeDefined();
      expect(event.organizer.name).toBe('City Arts Collective');
      expect(event.organizer.email).toBe('events@cityarts.example.com');
    });
  });

  describe('when an invalid id is provided', () => {
    it('should throw a NotFoundException', () => {
      expect(() => service.getEventbyId('evt-999')).toThrow(NotFoundException);
    });

    it('should throw with a meaningful message', () => {
      expect(() => service.getEventbyId('evt-999')).toThrow(
        'Event with id evt-999 not found',
      );
    });

    it('should throw for an empty string id', () => {
      expect(() => service.getEventbyId('')).toThrow(NotFoundException);
    });
  });
});