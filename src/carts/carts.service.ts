import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}
  //getting cart items , if it does not exist create a new cart

  
    async getOrCreateCart(userId: string) {
    let cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
      include: { items: { include: { product: true } } }, 
    });
    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { user_id: userId },
        include: { items: { include: { product: true } } },
      });
    }

    return cart;
  }
  //to add items in the cart
  async addItems(cartId:string,productId:string, quantity:number){
    return this.prisma.cartItem.create({
        data:{cart_id: cartId, product_id: productId, quantity } ,
        include:{product: true}//added product to get the product details

    })
  }
  //to update quantity
  async updateItems(cartId:string, itemId:string , quantity:number){
    return this.prisma.cartItem.update({
        where: {cart_item_id:cartId},
        data:{quantity},
        include:{product:true}
    })
  }
//to remove cart items
  async removeItems(cartId:string, itemId: string ){
    return this.prisma.cartItem.delete({
        where: {cart_item_id: cartId}
    })
  }
  async getCart(userId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: { user_id: userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart) return null;

    //calculate total price
    const total_price = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    return { ...cart, total_price };
  }
}

  