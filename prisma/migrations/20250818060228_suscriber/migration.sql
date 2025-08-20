/*
  Warnings:

  - You are about to drop the column `customerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hasAccess` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `priceId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."User_customerId_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "customerId",
DROP COLUMN "hasAccess",
DROP COLUMN "priceId";

-- CreateTable
CREATE TABLE "public"."Suscribers" (
    "id" TEXT NOT NULL,
    "customerId" TEXT,
    "priceId" TEXT,
    "hasAccess" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Suscribers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Suscribers_customerId_key" ON "public"."Suscribers"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Suscribers_userId_key" ON "public"."Suscribers"("userId");
