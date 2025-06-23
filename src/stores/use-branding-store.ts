/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrandDiscovery } from "@/types/branding/brand-discovery.interface";
import { BrandingStep } from "@/types/branding/branding-step.enum"
import { TargetAudience} from "@/types/branding/target-audience.interface";
import { create } from "zustand";

export interface BrandingState {

  brandingStep: BrandingStep,
  activeStep: number;
  brandDiscovery: BrandDiscovery;
  selectedImages: number[];
  selectedLogo: number | null;
  selectedColors: string[];
  selectedFont: string;
  selectedImagerySet: string | null;
  selectedVoiceSet: string | null;
  brandFeedback: string;

  // Actions
  UpdateBrandingStep: (step: BrandingStep) => void;
  setActiveStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateBrandDiscovery: (field: string, value: any) => void;
  toggleValue: (valueId: string) => void;
  toggleProblem: (problemId: string) => void;
  toggleImageSelection: (index: number) => void;
  setSelectedLogo: (index: number) => void;
  setSelectedColors: (colors: string[]) => void;
  setSelectedFont: (font: string) => void;
  setSelectedImagerySet: (setId: string) => void;
  setSelectedVoiceSet: (setId: string) => void;
  setBrandFeedback: (feedback: string) => void;
  updateValues: (values: string[]) => void;
  updateProblems: (values: string[]) => void;
  updateSelectedImages: (values: number[]) => void;
  updateSelectedLogo: (value: number) => void;
  updateImagerySet: (value: string) => void;
  updateVoiceSet: (value: string) => void;
  updateTargetAudience: (values: TargetAudience) => void;
  updateTargetAudienceValues: (values: TargetAudience[]) => void
  removeTargetAudienceItem: (id: string) => void
}

const useBrandingStore = create<BrandingState>((set) => ({

  brandingStep: BrandingStep.BRAND_DISCOVERY,
  activeStep: 0,
  brandDiscovery: {
    businessName:"",
    businessDescription: "",
    targetAudience: [],
    industry: "",
    values: [],
    competitors: "",
    differentiation: "",
    personality: {
      formalCasual: 50,
      traditionalModern: 50,
      seriousPlayful: 50,
    },
    problemsSolved: [],
    shortTermGoals: "",
    longTermGoals: "",
    visualPreferences: "",
    visualAversions: "",
  },
  selectedImages: [1, 4, 7],
  selectedLogo: null,
  selectedColors: [],
  selectedFont: "inter",
  selectedImagerySet: null,
  selectedVoiceSet: null,
  brandFeedback: "",

  // Actions
  UpdateBrandingStep: (step: BrandingStep) => set({brandingStep: step}),

  setActiveStep: (step: number) => set({ activeStep: step }),

  goToNextStep: () =>
    set((state) => ({
      activeStep: Math.min(7, state.activeStep + 1),
    })),
  
  goToPreviousStep: () =>
    set((state) => ({
      activeStep: Math.max(0, state.activeStep - 1),
    })),

  updateSelectedImages: (values: number[]) =>
    set((state) => ({
      ...state,
      selectedImages: [...values],
    })),

  updateSelectedLogo: (value: number) =>
    set((state) => ({
      ...state,
      selectedLogo: value,
    })),

  updateImagerySet: (value: string) =>
    set((state) => ({
      ...state,
      selectedImagerySet: value,
    })),

  updateVoiceSet: (value: string) =>
    set((state) => ({
      ...state,
      selectedVoiceSet: value,
    })),

  updateBrandDiscovery: (field: string, value: any) =>
    set((state) => {
      const newState = { ...state };
      const newBrandDiscovery = { ...newState.brandDiscovery };

      // Handle nested objects
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        // Use type assertion to tell TypeScript it's safe to access this property
        (newBrandDiscovery as any)[parent] = {
          ...(newBrandDiscovery as any)[parent],
          [child]: value,
        };
      } else {
        // Use type assertion for setting properties dynamically
        (newBrandDiscovery as any)[field] = value;
      }
      return { brandDiscovery: newBrandDiscovery };
    }),

  toggleValue: (valueId: string) =>
    set((state) => {
      const values = [...state.brandDiscovery.values];
      const index = values.indexOf(valueId);

      if (index !== -1) {
        values.splice(index, 1);
      } else {
        values.push(valueId);
      }

      return {
        brandDiscovery: {
          ...state.brandDiscovery,
          values,
        },
      };
    }),

  updateValues: (values: string[]) =>
    set((state) => ({
      brandDiscovery: {
        ...state.brandDiscovery,
        values: [...values],
      },
    })),

  updateProblems: (values: string[]) =>
    set((state) => ({
      brandDiscovery: {
        ...state.brandDiscovery,
        problemsSolved: [...values],
      },
    })),

  toggleProblem: (problemId: string) =>
    set((state) => {
      const problems = [...state.brandDiscovery.problemsSolved];
      const index = problems.indexOf(problemId);

      if (index !== -1) {
        problems.splice(index, 1);
      } else {
        problems.push(problemId);
      }

      return {
        brandDiscovery: {
          ...state.brandDiscovery,
          problemsSolved: problems,
        },
      };
    }),

  toggleImageSelection: (index: number) =>
    set((state) => {
      const selectedImages = [...state.selectedImages];
      const imageIndex = selectedImages.indexOf(index);

      if (imageIndex !== -1) {
        selectedImages.splice(imageIndex, 1);
      } else if (selectedImages.length < 5) {
        selectedImages.push(index);
      }

      return { selectedImages };
    }),

  setSelectedLogo: (index: number) => set({ selectedLogo: index }),

  setSelectedColors: (colors: string[]) => set({ selectedColors: colors }),
  setSelectedFont: (font: string) => set({ selectedFont: font }),
  setSelectedImagerySet: (setId: string) => set({ selectedImagerySet: setId }),
  setSelectedVoiceSet: (setId: string) => set({ selectedVoiceSet: setId }),
  setBrandFeedback: (feedback: string) => set({ brandFeedback: feedback }),

  updateTargetAudience: (value: TargetAudience) => set((state) => ({
    brandDiscovery: {
      ...state.brandDiscovery,
      targetAudience: [...state.brandDiscovery.targetAudience, value]
    }
  })),
  updateTargetAudienceValues: (values: TargetAudience[]) => set((state) => ({
    brandDiscovery: {
      ...state.brandDiscovery,
      targetAudience: [...state.brandDiscovery.targetAudience, ...values]
    }
  })),
  removeTargetAudienceItem: (id: string) => set((state) => ({
    brandDiscovery :{
      ...state.brandDiscovery,
      targetAudience: [...state.brandDiscovery.targetAudience.filter(aud => aud.uniqueId != id)]
    }
  }))
}));

export default useBrandingStore;
