import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { Order, TicketResult } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  private buildSeatKey(row: number, seat: number) {
    return `${row}-${seat}`;
  }

  async createOrder(order: Order) {
    try {
        // Проверяем, что все билеты относятся к одному фильму
      const filmId = order.tickets[0].film;
      if (!order.tickets.every((t) => t.film === filmId)) {
        throw new BadRequestException(
          'All tickets in the order must belong to the same film',
        );
      }

      const film = await this.filmsRepository.findById(filmId);
      if (!film) throw new NotFoundException(`Film with id ${filmId} not found`);

      // Группируем билеты по sessionId
      const ticketsBySession = new Map<string, typeof order.tickets>();

      for (const ticket of order.tickets) {
        if (!ticketsBySession.has(ticket.session)) {
          ticketsBySession.set(ticket.session, []);
        }
        ticketsBySession.get(ticket.session)!.push(ticket);
      }

      // Для каждого сеанса проверяем места
      for (const [sessionId, tickets] of ticketsBySession.entries()) {
        const session = film.schedules.find((s) => s.id === sessionId);

        if (!session) {
          throw new NotFoundException(`Session with id ${sessionId} not found`);
        }

        // Проверка корректности ряд/место
        for (const ticket of tickets) {
          if (ticket.row > session.rows || ticket.seat > session.seats) {
            throw new UnprocessableEntityException(
              `Invalid seat for session ${sessionId}. Max row=${session.rows}, max seat=${session.seats}`,
            );
          }
        }

        // Проверка дубликатов внутри одного заказа
        const seenSeats = new Set<string>();

        for (const ticket of tickets) {
          const key = this.buildSeatKey(ticket.row, ticket.seat);
          if (seenSeats.has(key)) {
            throw new UnprocessableEntityException(
              `Duplicate seat ${key} in the order`,
            );
          }
          seenSeats.add(key);
        }

        // Проверка занятых мест в базе
        const takenSeats = new Set(session.taken ?? []);

        for (const ticket of tickets) {
          const key = this.buildSeatKey(ticket.row, ticket.seat);
          if (takenSeats.has(key)) {
            throw new ConflictException(`Seat ${key} is already taken`);
          }
        }

        // Добавляем новые занятые места
        const newTaken = tickets.map((t) =>
          this.buildSeatKey(t.row, t.seat),
        );
        session.taken = [...takenSeats, ...newTaken];
      }

      // Сохраняем обновлённые сессии
      await this.filmsRepository.updateFilm(film);

      // Генерация ответа
      const orderId = Date.now().toString();

      const result: TicketResult[] = order.tickets.map((ticket) => ({
        ...ticket,
        id: orderId,
      }));

      return {
        total: result.length,
        items: result,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException ||
        error instanceof UnprocessableEntityException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new BadRequestException('Failed to create order');
    }
  }
}
