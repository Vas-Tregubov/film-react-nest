// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Film, FilmDocument, Schedule } from './films.schema';

// @Injectable()
// export class FilmsRepository {
//   constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

//   async findAll() {
//     return this.filmModel.find().lean().exec();
//   }

//   async findById(id: string) {
//     return this.filmModel.findOne({ id }).lean().exec();
//   }

//   async updateScheduleById(id: string, schedule: Schedule[]) {
//     return this.filmModel.updateOne({ id }, { $set: { schedule } }).exec();
//   }

//   async addFilms(films: Partial<Film>[]) {
//     return this.filmModel.insertMany(films);
//   }
// }
