import { BrandPersonality } from "./brand-personality.interface";
import { TargetAudience } from "./target-audience.interface";

export interface BrandDiscovery {
  businessName: string,
  businessDescription: string,
  targetAudience: TargetAudience[];
  industry: string;
  values: string[];
  competitors: string;
  differentiation: string;
  personality: BrandPersonality;
  problemsSolved: string[];
  shortTermGoals: string;
  longTermGoals: string;
  visualPreferences: string;
  visualAversions: string;
}