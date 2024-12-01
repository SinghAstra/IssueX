-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('BUG', 'FEATURE', 'IMPROVEMENT', 'OTHER');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "isAiGenerated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "issueType" "IssueType" NOT NULL DEFAULT 'BUG';
