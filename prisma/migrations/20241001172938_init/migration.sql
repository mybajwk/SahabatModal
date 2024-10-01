-- CreateTable
CREATE TABLE "UserAccount" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "image" TEXT,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBillingAddress" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "address_line" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state_province" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "UserBillingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentoring" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "Topic" TEXT NOT NULL,
    "requested_date" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "mentor_id" TEXT NOT NULL,
    "mentee_id" TEXT NOT NULL,
    "business_id" TEXT,
    "Description" TEXT,
    "mentoring_status" INTEGER NOT NULL,
    "content" TEXT[],

    CONSTRAINT "Mentoring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "business_age" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crowdfunding" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seeker_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address_line" TEXT NOT NULL,
    "address_url" TEXT,
    "media" TEXT NOT NULL,
    "target_amount" BIGINT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "amount" BIGINT NOT NULL,
    "Description" TEXT,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Crowdfunding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrowdfundingItem" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "crowdfunding_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "jenis_item" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,

    CONSTRAINT "CrowdfundingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrowdfundingFaq" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "crowdfunding_id" TEXT NOT NULL,
    "Question" TEXT NOT NULL,
    "Answer" TEXT,

    CONSTRAINT "CrowdfundingFaq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingData" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "crowdfunding_item_id" TEXT NOT NULL,
    "investor_id" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "funding_status" BOOLEAN NOT NULL,
    "received_status" BOOLEAN NOT NULL,

    CONSTRAINT "FundingData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creator_id" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coin" BIGINT NOT NULL,
    "tag" TEXT[],

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForumComment" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creator_id" TEXT NOT NULL,
    "forum_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coin" BIGINT NOT NULL,

    CONSTRAINT "ForumComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_email_key" ON "UserAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_phone_number_key" ON "UserAccount"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_username_key" ON "UserAccount"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserBillingAddress_user_id_key" ON "UserBillingAddress"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Business_owner_id_key" ON "Business"("owner_id");

-- AddForeignKey
ALTER TABLE "UserBillingAddress" ADD CONSTRAINT "UserBillingAddress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentoring" ADD CONSTRAINT "Mentoring_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentoring" ADD CONSTRAINT "Mentoring_mentee_id_fkey" FOREIGN KEY ("mentee_id") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crowdfunding" ADD CONSTRAINT "Crowdfunding_seeker_id_fkey" FOREIGN KEY ("seeker_id") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrowdfundingItem" ADD CONSTRAINT "CrowdfundingItem_crowdfunding_id_fkey" FOREIGN KEY ("crowdfunding_id") REFERENCES "Crowdfunding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CrowdfundingFaq" ADD CONSTRAINT "CrowdfundingFaq_crowdfunding_id_fkey" FOREIGN KEY ("crowdfunding_id") REFERENCES "Crowdfunding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingData" ADD CONSTRAINT "FundingData_crowdfunding_item_id_fkey" FOREIGN KEY ("crowdfunding_item_id") REFERENCES "Crowdfunding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumComment" ADD CONSTRAINT "ForumComment_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "UserAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumComment" ADD CONSTRAINT "ForumComment_forum_id_fkey" FOREIGN KEY ("forum_id") REFERENCES "Forum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
