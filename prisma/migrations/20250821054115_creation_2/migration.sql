-- CreateTable
CREATE TABLE "public"."contectReview" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "contectReview_pkey" PRIMARY KEY ("id")
);
