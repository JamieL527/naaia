/*
  Warnings:

  - You are about to drop the column `paymentAmount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "paymentAmount",
ADD COLUMN     "stripeProductId" TEXT;
