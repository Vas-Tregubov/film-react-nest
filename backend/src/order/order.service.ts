import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderResultDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  createOrder(dto: CreateOrderDto): OrderResultDto {
    return {
      orderId: 'order123',
      email: dto.email,
      phone: dto.phone,
      totalPrice: 0,
      tickets: [],
    };
  }
}
