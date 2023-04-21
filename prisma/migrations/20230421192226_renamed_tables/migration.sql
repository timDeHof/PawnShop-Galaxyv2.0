/*
  Warnings:

  - You are about to drop the `product_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_orders" DROP CONSTRAINT "product_orders_orderId_fkey";

-- DropForeignKey
ALTER TABLE "product_orders" DROP CONSTRAINT "product_orders_productId_fkey";

-- DropTable
DROP TABLE "product_categories";

-- DropTable
DROP TABLE "product_orders";

-- CreateTable
CREATE TABLE "productCategories" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER,
    "categoryId" INTEGER,

    CONSTRAINT "productCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productOrders" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER,
    "productId" INTEGER,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "productOrders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "productCategories" ADD CONSTRAINT "productCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productCategories" ADD CONSTRAINT "productCategories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productOrders" ADD CONSTRAINT "productOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productOrders" ADD CONSTRAINT "productOrders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
