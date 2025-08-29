//Any authenticated user should be able to view categories.
//Only admin should be able to create, update, and delete categories.

import { 
  Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request 
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(AuthGuard('jwt')) // all routes need authentication
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // GET /categories → Any authenticated user
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  // POST /categories → Only ADMIN
  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  create(@Body() body: { category_name: string }, @Request() req) {
    return this.categoriesService.create(body);
  }

  // PATCH /categories/:id → Only ADMIN
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() body: { category_name?: string }, @Request() req) {
    return this.categoriesService.update(id, body);
  }

  // DELETE /categories/:id → Only ADMIN
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string, @Request() req) {
    return this.categoriesService.remove(id);
  }
}
