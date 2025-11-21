import { Injectable } from '@nestjs/common';
import { FilmDto, ScheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  getAll(): FilmDto[] {
    return [];
  }

  getSchedule(id: string): ScheduleDto[] {
    return [];
  }
}
