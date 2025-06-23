export interface TargetAudience {
  targetAudienceType: string,
  companySize?: string,
  industry?: string,
  annualRevenue?: string,
  decisionMakerRole?: string,
  geographicMarket?: string,
  ageRange: [number, number];
  gender: string;
  income: string;
  education: string;
  location: string;
}

export enum TargetAudienceType {
  INDIVIDUAL_CONSUMER = "INDIVIDUAL_CONSUMER",
  BUSINESS = "BUSINESS"
}