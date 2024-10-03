-- DropForeignKey
ALTER TABLE "FundingData" DROP CONSTRAINT "FundingData_crowdfunding_item_id_fkey";

-- AlterTable
ALTER TABLE "FundingData" ADD COLUMN     "crowdfundingId" TEXT,
ALTER COLUMN "crowdfunding_item_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FundingData" ADD CONSTRAINT "FundingData_crowdfunding_item_id_fkey" FOREIGN KEY ("crowdfunding_item_id") REFERENCES "CrowdfundingItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingData" ADD CONSTRAINT "FundingData_crowdfundingId_fkey" FOREIGN KEY ("crowdfundingId") REFERENCES "Crowdfunding"("id") ON DELETE SET NULL ON UPDATE CASCADE;
