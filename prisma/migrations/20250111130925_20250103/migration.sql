-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_sessionToken_idx" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "Asset_id_idx" ON "Asset"("id");

-- CreateIndex
CREATE INDEX "AssetBeneficiarySharing_id_idx" ON "AssetBeneficiarySharing"("id");

-- CreateIndex
CREATE INDEX "Beneficiary_id_idx" ON "Beneficiary"("id");

-- CreateIndex
CREATE INDEX "Contact_id_idx" ON "Contact"("id");

-- CreateIndex
CREATE INDEX "Executor_id_idx" ON "Executor"("id");

-- CreateIndex
CREATE INDEX "Invoice_id_idx" ON "Invoice"("id");

-- CreateIndex
CREATE INDEX "Payment_id_idx" ON "Payment"("id");

-- CreateIndex
CREATE INDEX "Will_id_idx" ON "Will"("id");

-- CreateIndex
CREATE INDEX "users_id_idx" ON "users"("id");
