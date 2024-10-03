/*
  Warnings:

  - You are about to drop the column `address_id` on the `FundingData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FundingData" DROP COLUMN "address_id";

-- AddForeignKey
ALTER TABLE "FundingData" ADD CONSTRAINT "FundingData_investor_id_fkey" FOREIGN KEY ("investor_id") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
