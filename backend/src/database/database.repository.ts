import { Injectable, Optional } from '@nestjs/common';
import { FilmDto } from 'src/films/dto/films.dto';
import { CreateOrderTicketDto } from 'src/order/dto/order.dto';
import { PostgresRepository } from './postgresql.repository';
import { MongodbRepository } from './mongodb.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseRepository {
  private databaseType: string;
  constructor(
    @Optional() private postgresRepository: PostgresRepository,
    @Optional() private mongodbRepository: MongodbRepository,
    private config: ConfigService,
  ) {
    this.databaseType = config.get<string>('database.driver');
  }

  async filmsFindAll(): Promise<FilmDto[]> {
    switch (this.databaseType) {
      case 'postgres':
        return await this.postgresRepository.filmsFindAll();
      case 'mongodb':
        return await this.mongodbRepository.filmsFindAll();
    }
  }

  async findFilmById(id: string): Promise<FilmDto> {
    switch (this.databaseType) {
      case 'postgres':
        return await this.postgresRepository.findFilmById(id);
      case 'mongodb':
        return await this.mongodbRepository.findFilmById(id);
    }
  }

  async updateFilmSchedules(tikets: CreateOrderTicketDto[], films?: FilmDto[]) {
    switch (this.databaseType) {
      case 'postgres':
        return await this.postgresRepository.updateFilmSchedules(tikets);
      case 'mongodb':
        return await this.mongodbRepository.updateFilmScheduleById(
          tikets,
          films,
        );
    }
  }
}