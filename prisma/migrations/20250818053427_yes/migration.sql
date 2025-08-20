/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "customerId" TEXT,
ADD COLUMN     "hasAccess" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_customerId_key" ON "public"."User"("customerId");
