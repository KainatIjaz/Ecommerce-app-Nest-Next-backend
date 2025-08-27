import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(data: { category_name: string }) {
    return this.prisma.category.create({ data });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  update(id: string, data: { category_name?: string }) {
    return this.prisma.category.update({
      where: { category_id: id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.category.delete({
      where: { category_id: id },
    });
  }

  

}
