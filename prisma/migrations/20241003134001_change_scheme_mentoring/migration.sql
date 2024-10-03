/*
  Warnings:

  - You are about to drop the column `image` on the `Mentoring` table. All the data in the column will be lost.
  - Changed the type of `requested_date` on the `Mentoring` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Mentoring" DROP COLUMN "image",
DROP COLUMN "requested_date",
ADD COLUMN     "requested_date" TIMESTAMP(3) NOT NULL;
