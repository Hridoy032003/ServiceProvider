/*
  Warnings:

  - You are about to drop the column `description` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `durationInMinutes` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `services` table. All the data in the column will be lost.
  - Added the required column `serviceDuration` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceName` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicePrice` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."services" DROP COLUMN "description",
DROP COLUMN "durationInMinutes",
DROP COLUMN "name",
DROP COLUMN "price",
ADD COLUMN     "serviceDescription" TEXT,
ADD COLUMN     "serviceDuration" INTEGER NOT NULL,
ADD COLUMN     "serviceName" TEXT NOT NULL,
ADD COLUMN     "servicePrice" DECIMAL(10,2) NOT NULL;
