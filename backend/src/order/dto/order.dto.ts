import {
  IsString,
  IsNumber,
  IsArray,
  IsEmail,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

//Входящие DTO

export class CreateOrderTicketDto {
  @IsString()
  filmId: string;

  @IsString()
  sessionId: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;
}

export class CreateOrderDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderTicketDto)
  tickets: CreateOrderTicketDto[];
}

//Исходящие DTO

export class TicketResultDto {
  @IsString()
  ticketId: string;

  @IsNumber()
  price: number;

  @IsString()
  filmId: string;

  @IsString()
  sessionId: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;
}

export class OrderResultDto {
  @IsString()
  orderId: string;

  @IsNumber()
  totalPrice: number;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketResultDto)
  tickets: TicketResultDto[];
}
