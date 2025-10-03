/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

export interface ResearchObjectives {
  // Business Context
  businessName: string;
  industry: string;
  businessSize: string;
  businessStage: string;
  productsServices: string;

  // Research Goals
  primaryGoal: string;
  businessDecisions: string;
  oneThingToLearn: string;
  successMeasurement: string;
  requestorExpectations: string;

  // Focus Areas & Issues
  currentChallenges: string;
  opportunitiesToValidate: string;
  assumptionsToTest: string;
  leastClarityAreas: string[];
  withoutResearchConsequences: string;

  // Discovery Targets
  customerUnderstanding: string;
  marketInsights: string;
  competitorStrategies: string;
  internalFactors: string;
  uncertainTrends: string;

  // Target Audiences
  primaryResearchTargets: string[];
  demographicCharacteristics: string;
  behavioralCharacteristics: string;
  excludedGroups: string;
  existingContactLists: string;

  // Scope Parameters
  geographicMarkets: string;
  completionDeadline: string;
  budgetRange: string;
  resultsAudience: string;
  topicsToAvoid: string;
}

export enum MarketingResearchStep {
  RESEARCH_OBJECTIVES = "RESEARCH_OBJECTIVES",
  RESEARCH_DESIGN = "RESEARCH_DESIGN",
  DATA_COLLECTION = "DATA_COLLECTION",
  ANALYSIS_REPORTING = "ANALYSIS_REPORTING"
}

export interface MarketingResearchState {
  marketingResearchStep: MarketingResearchStep;
  activeStep: number;
  researchObjectives: ResearchObjectives;
  // Step 2 - Research Design (persist result for Step 3)
  researchDesign: ResearchDesignClaudeResponse | null;
  // Step 3 - Data Collection state per methodology index
  dataCollection: Record<number, {
    findings: string;
    files: File[];
  }>;

  // Actions
  updateMarketingResearchStep: (step: MarketingResearchStep) => void;
  setActiveStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateResearchObjectives: (field: string, value: any) => void;
  toggleArrayValue: (field: string, value: string) => void;
  // Step 2/3 actions
  setResearchDesign: (design: ResearchDesignClaudeResponse | null) => void;
  updateDataCollectionFinding: (methodologyIndex: number, findings: string) => void;
  addDataCollectionFiles: (methodologyIndex: number, files: File[]) => void;
  removeDataCollectionFile: (methodologyIndex: number, fileIndex: number) => void;
}

const useMarketingResearchStore = create<MarketingResearchState>((set) => ({
  marketingResearchStep: MarketingResearchStep.RESEARCH_OBJECTIVES,
  activeStep: 0,
  researchObjectives: {
    // Business Context
    businessName: "",
    industry: "",
    businessSize: "",
    businessStage: "",
    productsServices: "",

    // Research Goals
    primaryGoal: "",
    businessDecisions: "",
    oneThingToLearn: "",
    successMeasurement: "",
    requestorExpectations: "",

    // Focus Areas & Issues
    currentChallenges: "",
    opportunitiesToValidate: "",
    assumptionsToTest: "",
    leastClarityAreas: [],
    withoutResearchConsequences: "",

    // Discovery Targets
    customerUnderstanding: "",
    marketInsights: "",
    competitorStrategies: "",
    internalFactors: "",
    uncertainTrends: "",

    // Target Audiences
    primaryResearchTargets: [],
    demographicCharacteristics: "",
    behavioralCharacteristics: "",
    excludedGroups: "",
    existingContactLists: "",

    // Scope Parameters
    geographicMarkets: "",
    completionDeadline: "",
    budgetRange: "",
    resultsAudience: "",
    topicsToAvoid: "",
  },

  // Step 2/3 initial state
  researchDesign: null,
  dataCollection: {},

  // Actions
  updateMarketingResearchStep: (step: MarketingResearchStep) => 
    set({ marketingResearchStep: step }),

  setActiveStep: (step: number) => set({ activeStep: step }),

  goToNextStep: () =>
    set((state) => ({
      activeStep: Math.min(3, state.activeStep + 1),
    })),
  
  goToPreviousStep: () =>
    set((state) => ({
      activeStep: Math.max(0, state.activeStep - 1),
    })),

  updateResearchObjectives: (field: string, value: any) =>
    set((state) => {
      return {
        researchObjectives: {
          ...state.researchObjectives,
          [field]: value,
        },
      };
    }),

  toggleArrayValue: (field: string, value: string) =>
    set((state) => {
      const currentArray = (state.researchObjectives as any)[field] || [];
      const index = currentArray.indexOf(value);
      let newArray;

      if (index !== -1) {
        newArray = currentArray.filter((_: any, i: number) => i !== index);
      } else {
        newArray = [...currentArray, value];
      }

      return {
        researchObjectives: {
          ...state.researchObjectives,
          [field]: newArray,
        },
      };
    }),

  setResearchDesign: (design) => set({ researchDesign: design }),

  updateDataCollectionFinding: (methodologyIndex, findings) =>
    set((state) => ({
      dataCollection: {
        ...state.dataCollection,
        [methodologyIndex]: {
          findings,
          files: state.dataCollection[methodologyIndex]?.files || [],
        },
      },
    })),

  addDataCollectionFiles: (methodologyIndex, files) =>
    set((state) => {
      const prev = state.dataCollection[methodologyIndex]?.files || [];
      return {
        dataCollection: {
          ...state.dataCollection,
          [methodologyIndex]: {
            findings: state.dataCollection[methodologyIndex]?.findings || "",
            files: [...prev, ...files],
          },
        },
      };
    }),

  removeDataCollectionFile: (methodologyIndex, fileIndex) =>
    set((state) => {
      const prev = state.dataCollection[methodologyIndex]?.files || [];
      const nextFiles = prev.filter((_, idx) => idx !== fileIndex);
      return {
        dataCollection: {
          ...state.dataCollection,
          [methodologyIndex]: {
            findings: state.dataCollection[methodologyIndex]?.findings || "",
            files: nextFiles,
          },
        },
      };
    }),
}));

export default useMarketingResearchStore;

// Shared types for Research Design output
export type ResearchDesignMethodology = {
  name: string;
  description: string;
  executionBlueprint: string[];
  resourceSpecifications: {
    sampleSize: string;
    participantCriteria: string;
    timeline: string;
  };
  questions: string[];
};

export type ResearchDesignClaudeResponse = {
  introduction: string;
  methodologies: ResearchDesignMethodology[];
};