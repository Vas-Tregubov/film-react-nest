import { BadRequestException, Injectable } from '@nestjs/common';
import { FilmsRepository } from '../films/films.repository';
import { OrderRepository } from './order.repository';
import { CreateOrderTicketDto } from './dto/order.dto';
import * as crypto from 'crypto';

@Injectable()
export class OrderService {
  constructor(
    private readonly filmsRepo: FilmsRepository,
    private readonly orderRepo: OrderRepository,
  ) {}

  async createOrder(tickets: CreateOrderTicketDto[]) {
    if (!tickets || !tickets.length) {
      throw new BadRequestException('Tickets array cannot be empty');
    }

    let total = 0;
    const resultTickets = [];

    for (const t of tickets) {
      // 1) Находим фильм
      const film = await this.filmsRepo.findById(t.film);
      if (!film) throw new BadRequestException('Film not found');

      // 2) Находим сеанс
      const session = film.schedule.find((s) => s.id === t.session);
      if (!session) throw new BadRequestException('Session not found');

      // 3) Проверяем место
      const seatKey = `${t.row}:${t.seat}`;
      if (session.taken.includes(seatKey)) {
        throw new BadRequestException(
          `Seat already taken: row=${t.row}, seat=${t.seat}`,
        );
      }

      // 4) Помечаем место занятым
      session.taken.push(seatKey);

      // 5) Цена — всегда от сеанса
      const price = session.price;
      total += price;

      // 6) Формируем билет под DTO
      resultTickets.push({
        id: crypto.randomUUID(),
        film: t.film,
        session: t.session,
        daytime: t.daytime,
        row: t.row,
        seat: t.seat,
        price,
      });

      // 7) сохраняем фильм с обновлённым taken[]
      await this.filmsRepo.updateScheduleById(film.id, film.schedule);
    }

    // 8) Сохраняем заказ
    await this.orderRepo.create({
      orderId: crypto.randomUUID(),
      totalPrice: total,
      tickets: resultTickets,
    });

    // 9) Возвращаем ответ строго под OrderResultDto
    return {
      total,
      items: resultTickets,
    };
  }
}
