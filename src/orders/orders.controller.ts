import { 
  Controller, Post, Get, Param, UseGuards, Request, ForbiddenException 
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Admin only: Get all orders
  @Get()
  @Roles('ADMIN')
  async getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  // User (or Admin) creates order for themselves
  @Post('me')
  async createMyOrder(@Request() req) {
    const userId = req.user.userId;
    return this.ordersService.createOrder(userId);
  }

  // Admin: get orders of any user by ID
  // Regular user: automatically blocked if not their own
  @Get('me')
  async getMyOrders(@Request() req) {
    const userId = req.user.userId;
    return this.ordersService.getOrdersByUser(userId);
  }

  // Admin: get a single order by orderId
  // Regular user: can only fetch their own orders
  @Get('single/:orderId')
  async getOrder(@Param('orderId') orderId: string, @Request() req) {
    const order = await this.ordersService.getOrderById(orderId);

    if (!order) {
      throw new ForbiddenException('Order not found');
    }

    if (order.user_id !== req.user.userId && req.user.role !== 'ADMIN') {
      throw new ForbiddenException('You can only view your own orders');
    }

    return order;
  }
}
