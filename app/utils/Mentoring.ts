export interface CreateMentoringRequest {
  title: string;
  description: string;
  requestDate: Date;
}

export interface MentoringFormattedData {
  businessImage: string | null;
  businessName: string | null;
  businessOwnerName: string | null;
  mentoringTopic: string;
  mentoringDate: Date | null;
  mentoringId: string;
}
