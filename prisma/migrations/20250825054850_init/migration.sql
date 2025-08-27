-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."Cart" (
    "cart_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_price" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "public"."CartItem" (
    "cart_item_id" TEXT NOT NULL,
    "cart_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("cart_item_id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "order_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "order_item_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("order_item_id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "category_id" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "public"."ProductCategory" (
    "product_category_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("product_category_id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "transaction_id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Cart" ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."Cart"("cart_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductCategory" ADD CONSTRAINT "ProductCategory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductCategory" ADD CONSTRAINT "ProductCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
