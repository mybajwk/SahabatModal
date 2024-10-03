/*
  Warnings:

  - A unique constraint covering the columns `[business_id]` on the table `Mentoring` will be added. If there are existing duplicate values, this will fail.
  - Made the column `business_id` on table `Mentoring` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Mentoring" ALTER COLUMN "business_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Mentoring_business_id_key" ON "Mentoring"("business_id");

-- AddForeignKey
ALTER TABLE "Mentoring" ADD CONSTRAINT "Mentoring_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
