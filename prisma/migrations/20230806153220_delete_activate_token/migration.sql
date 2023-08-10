/*
  Warnings:

  - You are about to drop the `ActivateToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActivateToken" DROP CONSTRAINT "ActivateToken_userId_fkey";

-- DropTable
DROP TABLE "ActivateToken";
