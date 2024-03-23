/*
  Warnings:

  - You are about to drop the column `stripeProductId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeProductId",
ADD COLUMN     "paymentAmount" INTEGER;
