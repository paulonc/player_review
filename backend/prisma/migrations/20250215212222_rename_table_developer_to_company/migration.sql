/*
  Warnings:

  - You are about to drop the column `developerId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `Developer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `companyId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_developerId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "developerId",
ADD COLUMN     "companyId" UUID NOT NULL;

-- DropTable
DROP TABLE "Developer";

-- CreateTable
CREATE TABLE "Company" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
