/*
  Warnings:

  - Added the required column `phone` to the `organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "phone" TEXT NOT NULL;
