/*
  Warnings:

  - You are about to drop the column `subscribedProductId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscribedProductId",
ADD COLUMN     "paymentAmount" INTEGER;
