import { Injectable, ForbiddenException } from '@nestjs/common'; // ✅ added ForbiddenException
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Anyone (authenticated) can view all products
  findAll() {
    return this.prisma.product.findMany();
  }

  // Only admin can create products
  async create(
    data: { name: string; description: string; price: number; image: string },
    user: any, 
  ) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can create products'); 
    }

    return this.prisma.product.create({ data });
  }

  // Only admin can update products
  async update(
    id: string,
    data: { name?: string; description?: string; price?: number; image?: string },
    user: any, 
  ) {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can update products'); 
    }

    return this.prisma.product.update({
      where: { product_id: id },
      data,
    });
  }

  async remove(id: string, user: any) { 
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can delete products'); 
    }

    return this.prisma.product.delete({
      where: { product_id: id },
    });
  }

  async addCategory(productId: string, categoryId: string, user: any) { 
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can add categories'); 
    }

    return this.prisma.productCategory.create({
      data: {
        product_id: productId,
        category_id: categoryId,
      },
    });
  }

  async removeCategory(productId: string, categoryId: string, user: any) { 
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can remove categories'); 
    }

    return this.prisma.productCategory.deleteMany({
      where: {
        product_id: productId,
        category_id: categoryId,
      },
    });
  }
}
