import { Controller, Post, Patch, Delete, Get, Param, Body } from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post(':userId')
  async getOrCreateCart(@Param('userId') userId: string) {
    return this.cartsService.getOrCreateCart(userId);
  }

  @Post(':cartId/items')
  async addItems(
    @Param('cartId') cartId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartsService.addItems(cartId, productId, quantity);
  }

  @Patch(':cartId/items/:itemId')
  async updateItems(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.cartsService.updateItems(cartId, itemId, quantity);
  }

  @Delete(':cartId/items/:itemId')
  async removeItems(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.cartsService.removeItems(cartId, itemId);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartsService.getCart(userId);
  }
}
