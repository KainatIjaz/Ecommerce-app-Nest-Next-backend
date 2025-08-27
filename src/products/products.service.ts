import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany();
  }

  create(data: { name: string; description: string; price: number; image: string }) {
    return this.prisma.product.create({ data });
  }

  update(id: string, data: { name?: string; description?: string; price?: number; image?: string }) {
    return this.prisma.product.update({
      where: { product_id: id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: { product_id: id },
    });
  }
  async addCategory(productId: string, categoryId: string) {
    return this.prisma.productCategory.create({
      data: {
        product_id: productId,
        category_id: categoryId,
      },
    });
  }

  async removeCategory(productId: string, categoryId: string) {
    return this.prisma.productCategory.deleteMany({
      where: {
        product_id: productId,
        category_id: categoryId,
      },
    });
  }
}
