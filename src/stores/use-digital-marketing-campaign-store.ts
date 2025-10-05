/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { TargetAudience } from "@/types/branding/target-audience.interface";

// Step 1: Campaign Foundation & Strategy
export interface CampaignFoundation {
  // Campaign Basics
  campaignName: string;
  productService: string;
  campaignObjective: string;
  primaryGoal: string;
  secondaryGoals: string[];

  // Target Audience
  targetAudience: TargetAudience[];

  // Budget & Timeline
  totalBudget: string;
  campaignStartDate: string;
  campaignEndDate: string;
  urgency: string;

  // Brand & Messaging
  uniqueValueProposition: string;
  keyMessages: string;
  brandTone: string;
  competitiveAdvantages: string;
  competitorContext: string;
}

// Step 2: Channel Strategy & Budget Allocation
export interface ChannelStrategy {
  recommendedChannels: RecommendedChannel[];
  customChannelPreferences: string;
}

export interface RecommendedChannel {
  channel: string;
  rationale: string;
  audienceReach: string;
  suggestedBudget: string;
  selected: boolean;
  allocatedBudget: string;
}

// Step 3: Campaign Creative & Content Development
export interface CampaignCreative {
  adCopyVariations: AdCopy[];
  socialMediaPosts: SocialPost[];
  emailSequences: EmailTemplate[];
  landingPageContent: LandingPageContent;
  visualDirectionBrief: string;
  contentThemes: string[];
}

export interface AdCopy {
  platform: string;
  headline: string;
  bodyText: string;
  callToAction: string;
  variation: number;
}

export interface SocialPost {
  platform: string;
  postText: string;
  hashtags: string[];
  mediaDirection: string;
}

export interface EmailTemplate {
  emailNumber: number;
  subject: string;
  preheader: string;
  bodyContent: string;
  callToAction: string;
  timing: string;
}

export interface LandingPageContent {
  headline: string;
  subheadline: string;
  heroSection: string;
  benefitsSections: string[];
  socialProof: string;
  callToAction: string;
  wireframeDescription: string;
}

// Step 4: Targeting & Technical Specifications
export interface TargetingSpecs {
  platformTargeting: PlatformTargeting[];
}

export interface PlatformTargeting {
  platform: string;
  demographics: {
    ageRange: string;
    gender: string;
    location: string;
    language: string;
  };
  interests: string[];
  behaviors: string[];
  deviceTargeting: string;
  placementRecommendations: string;
  bidStrategy: string;
  conversionTracking: string;
  setupInstructions: string;
}

// Step 5: Campaign Calendar & Execution Timeline
export interface CampaignCalendar {
  preLaunchPhase: CalendarPhase;
  launchPhase: CalendarPhase;
  activePhase: CalendarPhase;
  optimizationPhase: CalendarPhase;
  postCampaignPhase: CalendarPhase;
  contentPublishingSchedule: ContentScheduleItem[];
}

export interface CalendarPhase {
  phaseName: string;
  startDate: string;
  endDate: string;
  activities: string[];
  milestones: string[];
}

export interface ContentScheduleItem {
  date: string;
  platform: string;
  contentType: string;
  description: string;
  status: "scheduled" | "published" | "draft";
}

// Step 6: Measurement & Analytics Framework
export interface AnalyticsFramework {
  primaryKPIs: KPI[];
  secondaryKPIs: KPI[];
  utmStructure: UTMStructure;
  conversionTracking: ConversionTracking;
  dashboardRequirements: string;
  reportingSchedule: string;
  successBenchmarks: string;
}

export interface KPI {
  metric: string;
  definition: string;
  target: string;
  measurementMethod: string;
}

export interface UTMStructure {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
}

export interface ConversionTracking {
  primaryConversion: string;
  secondaryConversions: string[];
  trackingMethods: string[];
  pixelRequirements: string;
}

// Step 7: Campaign Package (generated output)
export interface CampaignPackage {
  strategyDocument: string;
  channelBriefs: ChannelBrief[];
  creativeAssets: any;
  mediaPlan: any;
  implementationGuide: string;
  measurementDashboard: any;
  campaignCalendar: any;
  generatedAt: string;
}

export interface ChannelBrief {
  channel: string;
  executionPlan: string;
  timeline: string;
  budget: string;
  keyTactics: string[];
}

export enum DigitalMarketingCampaignStep {
  CAMPAIGN_FOUNDATION = "CAMPAIGN_FOUNDATION",
  CHANNEL_STRATEGY = "CHANNEL_STRATEGY",
  CREATIVE_CONTENT = "CREATIVE_CONTENT",
  TARGETING_SPECS = "TARGETING_SPECS",
  CAMPAIGN_CALENDAR = "CAMPAIGN_CALENDAR",
  ANALYTICS_FRAMEWORK = "ANALYTICS_FRAMEWORK",
  CAMPAIGN_PACKAGE = "CAMPAIGN_PACKAGE",
}

export interface DigitalMarketingCampaignState {
  currentStep: DigitalMarketingCampaignStep;
  activeStep: number;

  // Step data
  campaignFoundation: CampaignFoundation;
  channelStrategy: ChannelStrategy | null;
  campaignCreative: CampaignCreative | null;
  targetingSpecs: TargetingSpecs | null;
  campaignCalendar: CampaignCalendar | null;
  analyticsFramework: AnalyticsFramework | null;
  campaignPackage: CampaignPackage | null;

  // Actions
  updateCurrentStep: (step: DigitalMarketingCampaignStep) => void;
  setActiveStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;

  // Step 1 actions
  updateCampaignFoundation: (field: string, value: any) => void;
  toggleSecondaryGoal: (goal: string) => void;
  updateTargetAudience: (value: TargetAudience) => void;
  removeTargetAudienceItem: (id: string) => void;

  // Step 2 actions
  setChannelStrategy: (strategy: ChannelStrategy | null) => void;
  toggleChannelSelection: (channelIndex: number) => void;
  updateChannelBudget: (channelIndex: number, budget: string) => void;

  // Step 3 actions
  setCampaignCreative: (creative: CampaignCreative | null) => void;

  // Step 4 actions
  setTargetingSpecs: (specs: TargetingSpecs | null) => void;

  // Step 5 actions
  setCampaignCalendar: (calendar: CampaignCalendar | null) => void;

  // Step 6 actions
  setAnalyticsFramework: (framework: AnalyticsFramework | null) => void;

  // Step 7 actions
  setCampaignPackage: (pkg: CampaignPackage | null) => void;
}

const useDigitalMarketingCampaignStore = create<DigitalMarketingCampaignState>(
  (set) => ({
    currentStep: DigitalMarketingCampaignStep.CAMPAIGN_FOUNDATION,
    activeStep: 0,

    campaignFoundation: {
      // Campaign Basics
      campaignName: "",
      productService: "",
      campaignObjective: "",
      primaryGoal: "",
      secondaryGoals: [],

      // Target Audience
      targetAudience: [],

      // Budget & Timeline
      totalBudget: "",
      campaignStartDate: "",
      campaignEndDate: "",
      urgency: "",

      // Brand & Messaging
      uniqueValueProposition: "",
      keyMessages: "",
      brandTone: "",
      competitiveAdvantages: "",
      competitorContext: "",
    },

    channelStrategy: null,
    campaignCreative: null,
    targetingSpecs: null,
    campaignCalendar: null,
    analyticsFramework: null,
    campaignPackage: null,

    // Actions
    updateCurrentStep: (step: DigitalMarketingCampaignStep) =>
      set({ currentStep: step }),

    setActiveStep: (step: number) => set({ activeStep: step }),

    goToNextStep: () =>
      set((state) => ({
        activeStep: Math.min(6, state.activeStep + 1),
      })),

    goToPreviousStep: () =>
      set((state) => ({
        activeStep: Math.max(0, state.activeStep - 1),
      })),

    // Step 1 actions
    updateCampaignFoundation: (field: string, value: any) =>
      set((state) => ({
        campaignFoundation: {
          ...state.campaignFoundation,
          [field]: value,
        },
      })),

    toggleSecondaryGoal: (goal: string) =>
      set((state) => {
        const currentGoals = state.campaignFoundation.secondaryGoals;
        const index = currentGoals.indexOf(goal);
        let newGoals;

        if (index !== -1) {
          newGoals = currentGoals.filter((_, i) => i !== index);
        } else {
          newGoals = [...currentGoals, goal];
        }

        return {
          campaignFoundation: {
            ...state.campaignFoundation,
            secondaryGoals: newGoals,
          },
        };
      }),

    updateTargetAudience: (value: TargetAudience) =>
      set((state) => ({
        campaignFoundation: {
          ...state.campaignFoundation,
          targetAudience: [value, ...state.campaignFoundation.targetAudience],
        },
      })),

    removeTargetAudienceItem: (id: string) =>
      set((state) => ({
        campaignFoundation: {
          ...state.campaignFoundation,
          targetAudience: state.campaignFoundation.targetAudience.filter(
            (aud) => aud.uniqueId !== id
          ),
        },
      })),

    // Step 2 actions
    setChannelStrategy: (strategy) => set({ channelStrategy: strategy }),

    toggleChannelSelection: (channelIndex: number) =>
      set((state) => {
        if (!state.channelStrategy) return state;

        const updatedChannels = [...state.channelStrategy.recommendedChannels];
        updatedChannels[channelIndex] = {
          ...updatedChannels[channelIndex],
          selected: !updatedChannels[channelIndex].selected,
        };

        return {
          channelStrategy: {
            ...state.channelStrategy,
            recommendedChannels: updatedChannels,
          },
        };
      }),

    updateChannelBudget: (channelIndex: number, budget: string) =>
      set((state) => {
        if (!state.channelStrategy) return state;

        const updatedChannels = [...state.channelStrategy.recommendedChannels];
        updatedChannels[channelIndex] = {
          ...updatedChannels[channelIndex],
          allocatedBudget: budget,
        };

        return {
          channelStrategy: {
            ...state.channelStrategy,
            recommendedChannels: updatedChannels,
          },
        };
      }),

    // Step 3 actions
    setCampaignCreative: (creative) => set({ campaignCreative: creative }),

    // Step 4 actions
    setTargetingSpecs: (specs) => set({ targetingSpecs: specs }),

    // Step 5 actions
    setCampaignCalendar: (calendar) => set({ campaignCalendar: calendar }),

    // Step 6 actions
    setAnalyticsFramework: (framework) =>
      set({ analyticsFramework: framework }),

    // Step 7 actions
    setCampaignPackage: (pkg) => set({ campaignPackage: pkg }),
  })
);

export default useDigitalMarketingCampaignStore;
