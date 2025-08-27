import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // POST /products
  @Post()
  create(@Body() body: { name: string; description: string; price: number; image: string }) {
    return this.productsService.create(body);
  }

  // PATCH /products/:id
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string; price?: number; image?: string },
  ) {
    return this.productsService.update(id, body);
  }

  // DELETE /products/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
    @Post(':productId/categories/:categoryId')
  addCategory(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.productsService.addCategory(productId, categoryId);
  }

  @Delete(':productId/categories/:categoryId')
  removeCategory(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return this.productsService.removeCategory(productId, categoryId);
  }
}
