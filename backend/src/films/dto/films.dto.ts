export class FilmDto {
  id: number;
  rating: number;
  director: string;
  tags: string;
  description: string;
}

export class ScheduleDto {
  id: string;
  day: string;
  time: string;
}
