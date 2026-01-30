import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let mockFilmsService: Partial<FilmsService>;

  beforeEach(async () => {
    mockFilmsService = {
      getAllFilms: jest.fn(),
      getFilmSchedule: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFilms', () => {
    it('should return all films', async () => {
      const mockFilms = [
        {
          id: 'f1',
          title: 'Alpha Movie',
          rating: 8.7,
          director: 'Alice',
          tags: ['thriller'],
          image: 'img1.jpg',
          cover: 'cover1.jpg',
          about: 'About alpha',
          description: 'Desc alpha',
          schedule: [],
        },
        {
          id: 'f2',
          title: 'Beta Movie',
          rating: 7.9,
          director: 'Bob',
          tags: ['comedy'],
          image: 'img2.jpg',
          cover: 'cover2.jpg',
          about: 'About beta',
          description: 'Desc beta',
          schedule: [],
        },
      ];

      (mockFilmsService.getAllFilms as jest.Mock).mockResolvedValue(mockFilms);

      const result = await controller.getFilms();

      expect(mockFilmsService.getAllFilms).toHaveBeenCalledTimes(1);
      expect(mockFilmsService.getAllFilms).toHaveBeenCalledWith();
      expect(result).toEqual(mockFilms);
    });
  });

  describe('getFilmSchedule', () => {
    it('should return the schedule for a given film ID', async () => {
      const filmId = 'film-123';
      const mockSchedule = [
        {
          id: 's1',
          daytime: '2026-02-01T18:00:00Z',
          hall: 3,
          rows: 12,
          seats: 120,
          price: 15,
          taken: ['C3', 'D4'],
          filmId,
          film: null,
        },
        {
          id: 's2',
          daytime: '2026-02-01T21:00:00Z',
          hall: 2,
          rows: 8,
          seats: 80,
          price: 12,
          taken: [],
          filmId,
          film: null,
        },
      ];

      (mockFilmsService.getFilmSchedule as jest.Mock).mockResolvedValue(
        mockSchedule,
      );

      const result = await controller.getFilmSchedule(filmId);

      expect(mockFilmsService.getFilmSchedule).toHaveBeenCalledTimes(1);
      expect(mockFilmsService.getFilmSchedule).toHaveBeenCalledWith(filmId);
      expect(result).toEqual(mockSchedule);
    });

    it('should return empty array for invalid film ID', async () => {
      const invalidFilmId = 'unknown-id';
      const emptySchedule: any[] = [];

      (mockFilmsService.getFilmSchedule as jest.Mock).mockResolvedValue(
        emptySchedule,
      );

      const result = await controller.getFilmSchedule(invalidFilmId);

      expect(mockFilmsService.getFilmSchedule).toHaveBeenCalledTimes(1);
      expect(mockFilmsService.getFilmSchedule).toHaveBeenCalledWith(
        invalidFilmId,
      );
      expect(result).toEqual(emptySchedule);
    });
  });
});
