-- CreateEnum
CREATE TYPE "Role" AS ENUM ('farmer', 'admin', 'expert');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('active', 'suspended', 'pending');

-- CreateEnum
CREATE TYPE "paymentstatus" AS ENUM ('pending', 'success', 'failed');

-- CreateEnum
CREATE TYPE "paymentmethod" AS ENUM ('stripe', 'mpesa');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "country" TEXT,
    "county" TEXT,
    "constituency" TEXT,
    "contact" TEXT,
    "code" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "profilePic" TEXT,
    "accountStatus" "AccountStatus" DEFAULT 'pending',
    "verificationTokenExpiresAt" TIMESTAMP(3) NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),
    "onboarding" BOOLEAN DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farmer" (
    "id" TEXT NOT NULL,
    "location" TEXT,
    "crops" TEXT[],

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "adminLevel" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expert" (
    "id" TEXT NOT NULL,
    "specialization" TEXT,
    "bio" TEXT,

    CONSTRAINT "Expert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiseaseCheck" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiseaseCheck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassificationResult" (
    "id" TEXT NOT NULL,
    "diseaseCheckId" TEXT NOT NULL,
    "diseaseName" TEXT NOT NULL,
    "confidenceScore" DOUBLE PRECISION NOT NULL,
    "diagnosedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassificationResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ClassificationResult_diseaseCheckId_key" ON "ClassificationResult"("diseaseCheckId");

-- AddForeignKey
ALTER TABLE "Farmer" ADD CONSTRAINT "Farmer_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expert" ADD CONSTRAINT "Expert_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseCheck" ADD CONSTRAINT "DiseaseCheck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassificationResult" ADD CONSTRAINT "ClassificationResult_diseaseCheckId_fkey" FOREIGN KEY ("diseaseCheckId") REFERENCES "DiseaseCheck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
