import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmDto, ScheduleDto } from './dto/films.dto';

@Controller('api/afisha/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getAll(): FilmDto[] {
    return this.filmsService.getAll();
  }

  @Get(':id/schedule')
  getSchedule(@Param('id') id: string): ScheduleDto[] {
    return this.filmsService.getSchedule(id);
  }
}
