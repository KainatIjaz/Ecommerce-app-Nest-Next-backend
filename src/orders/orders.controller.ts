import { Controller, Post, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // create order from user's cart
  @Post(':userId')
  async createOrder(@Param('userId') userId: string) {
    return this.ordersService.createOrder(userId);
  }

  // get all orders of a user
  @Get(':userId')
  async getOrders(@Param('userId') userId: string) {
    return this.ordersService.getOrdersByUser(userId);
  }

  // get a single order by orderId
  @Get('single/:orderId')
  async getOrder(@Param('orderId') orderId: string) {
    return this.ordersService.getOrderById(orderId);
  }
}
