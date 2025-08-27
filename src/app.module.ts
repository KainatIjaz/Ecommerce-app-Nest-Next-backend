import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartsModule } from './carts/carts.module';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule, CategoriesModule, CartsModule, OrdersModule, AuthModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class AppModule {}
