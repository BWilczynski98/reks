/*
  Warnings:

  - You are about to drop the column `tokenToActivate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tokenToResetPassword` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('DOG', 'CAT');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Residence" AS ENUM ('BASE', 'TEMPORARY_HOME');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ADAPTED', 'FOR_ADOPTION', 'UNADOPTABLE', 'QUARANTINE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tokenToActivate",
DROP COLUMN "tokenToResetPassword",
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ActiveToken" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActiveToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL DEFAULT (now() + '24:00:00'::interval),
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResetPasswordToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Home" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "locationWhereFound" TEXT NOT NULL,
    "timeWhenFound" TIMESTAMP(3) NOT NULL,
    "photoUrl" TEXT,
    "residence" "Residence" NOT NULL,
    "description" TEXT,
    "status" "Status" DEFAULT 'UNADOPTABLE',
    "userId" UUID NOT NULL,
    "referenceNumber" SERIAL NOT NULL,
    "descriptionOfHealth" TEXT,
    "homeId" UUID,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Drug" (
    "id" SERIAL NOT NULL,
    "animalId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "dose" TEXT NOT NULL,
    "hours" TEXT NOT NULL,

    CONSTRAINT "Drug_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActiveToken_userId_key" ON "ActiveToken"("userId");

-- AddForeignKey
ALTER TABLE "ActiveToken" ADD CONSTRAINT "ActiveToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetPasswordToken" ADD CONSTRAINT "ResetPasswordToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_homeId_fkey" FOREIGN KEY ("homeId") REFERENCES "Home"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drug" ADD CONSTRAINT "Drug_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
