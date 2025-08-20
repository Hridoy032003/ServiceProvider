/*
  Warnings:

  - The `status` column on the `bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `date` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slot` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('pending', 'confrimd', 'cancel');

-- AlterTable
ALTER TABLE "public"."bookings" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "slot" TEXT NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."BookingStatus" DEFAULT 'pending';
