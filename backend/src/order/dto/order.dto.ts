import { IsString, IsNumber, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

// ВХОД (от фронта)
export class CreateOrderTicketDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderTicketDto)
  tickets: CreateOrderTicketDto[];
}

// ВЫХОД: билет, сохранённый в заказе
export class TicketResultDto {
  @IsString()
  id: string;

  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsString()
  daytime: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

// ВЫХОД: ответ Order API
export class OrderResultDto {
  @IsNumber()
  total: number;

  @ValidateNested({ each: true })
  @Type(() => TicketResultDto)
  items: TicketResultDto[];
}
