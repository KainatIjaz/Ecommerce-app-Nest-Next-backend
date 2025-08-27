import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // Create a new order from the cart
  async createOrder(userId: string) {
    // fetching the cart of user
    const cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
      include: { items: { include: { product: true } } },
    });

    // checking if cart exists and is not empty
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // calculate total price
    const total_price = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    // creating the order
    const order = await this.prisma.order.create({
      data: {
        user_id: userId,
        status: 'PENDING',
        total_price,
        items: {
          create: cart.items.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: { items: { include: { product: true } }, transactions: true },
    });

    // creating a transaction that is linked to the order
    await this.prisma.transaction.create({
      data: {
        order_id: order.order_id,
        payment_method: 'CASH_ON_DELIVERY',
        status: 'PENDING',
        transaction_date: new Date(),
      },
    });

    // clear the cart
    await this.prisma.cartItem.deleteMany({
      where: { cart_id: cart.cart_id },
    });

    return order;
  }

  // Get all orders for a user
  async getOrdersByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { user_id: userId },
      include: {
        items: { include: { product: true } },
        transactions: true,
      },
    });
  }

  // Get one order by its ID
  async getOrderById(orderId: string) {
    return this.prisma.order.findUnique({
      where: { order_id: orderId },
      include: {
        items: { include: { product: true } },
        transactions: true,
      },
    });
  }
}
