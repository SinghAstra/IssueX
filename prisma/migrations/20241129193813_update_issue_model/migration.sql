/*
  Warnings:

  - The values [PENDING] on the enum `ConnectionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `aiAnalyzed` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `aiSuggestion` on the `Issue` table. All the data in the column will be lost.
  - Added the required column `title` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ConnectionStatus_new" AS ENUM ('CONNECTED', 'NOT_CONNECTED');
ALTER TABLE "Repository" ALTER COLUMN "connectionStatus" DROP DEFAULT;
ALTER TABLE "Repository" ALTER COLUMN "connectionStatus" TYPE "ConnectionStatus_new" USING ("connectionStatus"::text::"ConnectionStatus_new");
ALTER TYPE "ConnectionStatus" RENAME TO "ConnectionStatus_old";
ALTER TYPE "ConnectionStatus_new" RENAME TO "ConnectionStatus";
DROP TYPE "ConnectionStatus_old";
ALTER TABLE "Repository" ALTER COLUMN "connectionStatus" SET DEFAULT 'NOT_CONNECTED';
COMMIT;

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "aiAnalyzed",
DROP COLUMN "aiSuggestion",
ADD COLUMN     "body" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Repository" ALTER COLUMN "connectionStatus" SET DEFAULT 'NOT_CONNECTED';

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "githubCommentId" INTEGER NOT NULL,
    "issueId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_githubCommentId_idx" ON "Comment"("githubCommentId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
