import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAll() {
    const result = await this.filmsService.getAll();
    return result;
  }

  @Get(':id/schedule')
  getSchedule(@Param('id') id: string) {
    return this.filmsService.getSchedule(id);
  }

  @Post()
  addFilms(@Body() films: any[]) {
    return this.filmsService.addFilms(films);
  }
}
