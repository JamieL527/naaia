-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ADD COLUMN     "password_token" TEXT,
ADD COLUMN     "token_expired_at" TIMESTAMP(3);
