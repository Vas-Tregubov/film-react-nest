import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilmDto } from 'src/films/dto/films.dto';
import { CreateOrderTicketDto } from 'src/order/dto/order.dto';
import { Film } from 'src/films/films.schema';

@Injectable()
export class MongodbRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  filmsFindAll(): Promise<FilmDto[]> {
    return this.filmModel.find();
  }

  findFilmById(id: string): Promise<FilmDto> {
    return this.filmModel.findOne({ id: id });
  }

  async updateFilmScheduleById(
    tickets: CreateOrderTicketDto[],
    films: FilmDto[],
  ) {
    for (const ticket of tickets) {
      const taken = `${ticket.row}:${ticket.seat}`;
      const filmItem = films.find((item) => item.id === ticket.film);
      filmItem.schedule.forEach((element) => {
        if (
          element.id === ticket.session &&
          element.daytime === ticket.daytime
        ) {
          element.taken.push(taken);
        }
      });
      await this.filmModel.updateOne(
        { id: ticket.film },
        { $set: { schedule: filmItem.schedule } },
      );
    }
  }
}