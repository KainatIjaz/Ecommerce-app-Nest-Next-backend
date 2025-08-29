//Only authenticated users can access carts.
//A user can only manage their own cart (not someone else’s).
//Admins don’t need cart routes.
import { 
  Controller, Post, Patch, Delete, Get, Param, Body, UseGuards, Request, ForbiddenException 
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt')) // All routes require login
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  // Create or get the logged-in user's cart
  @Post('me')
  async getOrCreateCart(@Request() req) {
    const userId = req.user.userId; //  Take userId from JWT, not params
    return this.cartsService.getOrCreateCart(userId);
  }

  // Add items to the logged-in user's cart
  @Post('me/items')
  async addItems(
    @Request() req,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    const userId = req.user.userId;
    const cart = await this.cartsService.getOrCreateCart(userId);

    return this.cartsService.addItems(cart.cart_id, productId, quantity);
  }

  // Update item quantity in user's cart
  @Patch('me/items/:itemId')
  async updateItems(
    @Request() req,
    @Param('itemId') itemId: string,
    @Body('quantity') quantity: number,
  ) {
    const userId = req.user.userId;
    const cart = await this.cartsService.getOrCreateCart(userId);

    return this.cartsService.updateItems(cart.cart_id, itemId, quantity);
  }

  // Remove item from user's cart
  @Delete('me/items/:itemId')
  async removeItems(@Request() req, @Param('itemId') itemId: string) {
    const userId = req.user.userId;
    const cart = await this.cartsService.getOrCreateCart(userId);

    return this.cartsService.removeItems(cart.cart_id, itemId);
  }

  // Get the logged-in user's cart
  @Get('me')
  async getCart(@Request() req) {
    const userId = req.user.userId;
    return this.cartsService.getCart(userId);
  }
}
