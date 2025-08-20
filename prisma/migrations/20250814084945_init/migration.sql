-- CreateTable
CREATE TABLE "public"."Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceProvider" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ServiceProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServiceOffering" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "ServiceOffering_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "public"."Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProvider_businessName_key" ON "public"."ServiceProvider"("businessName");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProvider_phoneNumber_key" ON "public"."ServiceProvider"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProvider_contactEmail_key" ON "public"."ServiceProvider"("contactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceProvider_userId_key" ON "public"."ServiceProvider"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceOffering_serviceProviderId_serviceId_key" ON "public"."ServiceOffering"("serviceProviderId", "serviceId");
