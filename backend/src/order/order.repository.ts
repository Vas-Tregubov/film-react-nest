// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Order, OrderDocument } from './order.schema';

// @Injectable()
// export class OrderRepository {
//   constructor(
//     @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
//   ) {}

//   async create(order: Partial<Order>) {
//     return this.orderModel.create(order);
//   }

//   async findByOrderId(orderId: string) {
//     return this.orderModel.findOne({ orderId }).lean().exec();
//   }
// }
