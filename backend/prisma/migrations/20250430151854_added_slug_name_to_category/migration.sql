/*
  Warnings:

  - A unique constraint covering the columns `[slugname]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "slugname" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Category_slugname_key" ON "Category"("slugname");
