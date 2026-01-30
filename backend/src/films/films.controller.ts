import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { DevLogger } from 'src/logger/dev.logger';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getFilms() {
    console.log('🔥 CONTROLLER METHOD CALLED 🔥');
    const logger = new DevLogger();
    logger.log('HELLO FROM DEV LOGGER');
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  async getFilmSchedule(@Param('id') id: string) {
    return this.filmsService.getFilmSchedule(id);
  }
}
