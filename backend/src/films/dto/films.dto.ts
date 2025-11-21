import { IsNumber, IsString, IsArray } from 'class-validator';

export class FilmDto {
  @IsNumber()
  id: number;

  @IsNumber()
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  description: string;
}

export class ScheduleDto {
  @IsString()
  id: string;

  @IsString()
  day: string;

  @IsString()
  time: string;
}
