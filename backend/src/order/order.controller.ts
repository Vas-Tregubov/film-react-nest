import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderResultDto } from './dto/order.dto';

@Controller('api/afisha/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() dto: CreateOrderDto): OrderResultDto {
    return this.orderService.createOrder(dto);
  }
}
