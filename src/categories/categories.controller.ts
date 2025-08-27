import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';

import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() body: { category_name: string }) {
    return this.categoriesService.create(body);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { category_name?: string }) {
    return this.categoriesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }


}
