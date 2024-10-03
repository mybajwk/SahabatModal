export interface PostCrowdFundingBasicRequest {
  title: string;
  address: string;
  gmaps: string;
  media: string;
  fund: bigint;
  endDate: Date;
  startDate: Date;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface PostCrowdFundingDescRequest {
  deskripsi: string;
  faq: Faq[];
}

export interface CrowdFundingReward {
  fundLimit: bigint;
  itemDesc: string;
  itemImage: string;
  itemTitle: string;
  itemType: string;
}
export interface PostCrowdFundingRewardRequest {
  reward: CrowdFundingReward[];
}
