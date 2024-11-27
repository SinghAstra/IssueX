/*
  Warnings:

  - You are about to drop the column `isActive` on the `Repository` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('CONNECTED', 'PENDING');

-- AlterTable
ALTER TABLE "Repository" DROP COLUMN "isActive",
ADD COLUMN     "connectionStatus" "ConnectionStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "description" TEXT,
ADD COLUMN     "htmlUrl" TEXT,
ADD COLUMN     "templateId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubUsername" TEXT;
