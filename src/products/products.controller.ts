//JWT required everywhere → no unauthenticated requests allowed.
//Regular users : can only view products.
//Admins : can create, update, delete, and manage categories of products.

import { 
  Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request 
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard) // applies both JWT + Role guard
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Any authenticated user
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  //ADMIN only
  @Post()
  @Roles('ADMIN')
  create(
    @Body() body: { name: string; description: string; price: number; image: string },
    @Request() req,
  ) {
    return this.productsService.create(body, req.user);
  }

  // ADMIN only
  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string; price?: number; image?: string },
    @Request() req,
  ) {
    return this.productsService.update(id, body, req.user);
  }

  // ADMIN only
  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string, @Request() req) {
    return this.productsService.remove(id, req.user);
  }

  // ADMIN only
  @Post(':productId/categories/:categoryId')
  @Roles('ADMIN')
  addCategory(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
    @Request() req,
  ) {
    return this.productsService.addCategory(productId, categoryId, req.user);
  }

  // ADMIN only
  @Delete(':productId/categories/:categoryId')
  @Roles('ADMIN')
  removeCategory(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
    @Request() req,
  ) {
    return this.productsService.removeCategory(productId, categoryId, req.user);
  }
}
