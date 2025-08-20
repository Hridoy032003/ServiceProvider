/*
  Warnings:

  - You are about to drop the column `serviceDescription` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `serviceDuration` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `serviceName` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `servicePrice` on the `services` table. All the data in the column will be lost.
  - Added the required column `durationInMinutes` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."services" DROP COLUMN "serviceDescription",
DROP COLUMN "serviceDuration",
DROP COLUMN "serviceName",
DROP COLUMN "servicePrice",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "durationInMinutes" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL;
