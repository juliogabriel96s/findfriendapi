/*
  Warnings:

  - Added the required column `organizationId` to the `dog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dog" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "dog" ADD CONSTRAINT "dog_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
