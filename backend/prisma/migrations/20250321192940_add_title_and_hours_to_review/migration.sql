/*
  Warnings:

  - Added the required column `title` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "hoursPlayed" INTEGER,
ADD COLUMN     "recommended" BOOLEAN,
ADD COLUMN     "title" TEXT NOT NULL;
