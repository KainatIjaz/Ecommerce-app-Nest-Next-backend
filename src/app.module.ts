import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //  load .env and make it available everywhere
    PrismaModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartsModule,
    OrdersModule,
    AuthModule,
  ],
})
export class AppModule {}
