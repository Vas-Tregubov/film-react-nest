import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepo: FilmsRepository) {}

  async getAll() {
    return this.filmsRepo.findAll();
  }

  async getSchedule(filmId: string) {
    const film = await this.filmsRepo.findById(filmId);
    if (!film) throw new NotFoundException('Film not found');
    return film.schedule;
  }

  async addFilms(films: any[]) {
    return this.filmsRepo.addFilms(films);
  }
}
