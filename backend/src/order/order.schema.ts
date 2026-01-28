// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';

// export type OrderDocument = HydratedDocument<Order>;
// export type TicketDocument = HydratedDocument<OrderTicket>;

// @Schema()
// export class OrderTicket {
//   @Prop({ required: true })
//   id: string; // UUID билета, совпадает с DTO

//   @Prop({ required: true })
//   price: number;

//   @Prop({ required: true })
//   film: string; // UUID фильма

//   @Prop({ required: true })
//   session: string; // UUID сеанса

//   @Prop({ required: true })
//   row: number;

//   @Prop({ required: true })
//   seat: number;
// }

// export const OrderTicketSchema = SchemaFactory.createForClass(OrderTicket);

// @Schema()
// export class Order {
//   @Prop({ required: true })
//   orderId: string;

//   @Prop({ required: true })
//   totalPrice: number;

//   @Prop({ type: [OrderTicketSchema], default: [] })
//   tickets: OrderTicket[];
// }

// export const OrderSchema = SchemaFactory.createForClass(Order);
