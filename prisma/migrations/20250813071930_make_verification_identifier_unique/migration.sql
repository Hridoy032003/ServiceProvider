/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."VerificationToken_identifier_token_key";

-- DropIndex
DROP INDEX "public"."VerificationToken_token_key";

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_key" ON "public"."VerificationToken"("identifier");
