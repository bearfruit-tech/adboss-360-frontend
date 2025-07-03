/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrandDiscovery } from "@/types/branding/brand-discovery.interface";
import { BrandingStep } from "@/types/branding/branding-step.enum"
import { TargetAudience} from "@/types/branding/target-audience.interface";
import { BrandVoice } from "@/types/branding/brand-voice-claude-response";
import { create } from "zustand";

interface LogoOption {
  name: string;
  description: string;
  svg: string;
}

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface ImageryDirection {
  id: string,
  keyword: string,
  description: string,
  images: UnsplashImage[]
}

export interface BrandingState {

  brandingStep: BrandingStep,
  activeStep: number;
  brandDiscovery: BrandDiscovery;
  selectedImages: number[];
  selectedLogo: string | null;
  selectedColors: string[];
  selectedFont: string;
  selectedImagerySet: string | null;
  selectedVoiceSet: string | null;
  brandVoices: BrandVoice[];
  brandFeedback: string;
  logoOptions: LogoOption[];
  hasGeneratedLogos: boolean;
  customLogoOptions: LogoOption[];
  imagerySampleImages: ImageryDirection[];

  // Actions
  UpdateBrandingStep: (step: BrandingStep) => void;
  setActiveStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateBrandDiscovery: (field: string, value: any) => void;
  toggleValue: (valueId: string) => void;
  toggleProblem: (problemId: string) => void;
  toggleImageSelection: (index: number) => void;
  setSelectedLogo: (svg: string) => void;
  setSelectedColors: (colors: string[]) => void;
  setSelectedFont: (font: string) => void;
  setSelectedImagerySet: (setId: string) => void;
  setSelectedVoiceSet: (setId: string) => void;
  setBrandVoices: (voices: BrandVoice[]) => void;
  setBrandFeedback: (feedback: string) => void;
  updateValues: (values: string[]) => void;
  updateProblems: (values: string[]) => void;
  updateSelectedImages: (values: number[]) => void;
  updateSelectedLogo: (svg: string) => void;
  updateImagerySet: (value: string) => void;
  updateVoiceSet: (value: string) => void;
  updateTargetAudience: (values: TargetAudience) => void;
  updateTargetAudienceValues: (values: TargetAudience[]) => void
  removeTargetAudienceItem: (id: string) => void;
  setLogoOptions: (options: Array<{ name: string; description: string; svg: string }>) => void;
  setHasGeneratedLogos: (hasGenerated: boolean) => void;
  setCustomLogoOptions: (options: Array<{ name: string; description: string; svg: string }>) => void;
  addCustomLogo: (logo: { name: string; description: string; svg: string }) => void;
  removeCustomLogo: (index: number) => void;
  setImagerySampleImages: (images: ImageryDirection[]) => void;
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
  brandVoices: [],
  brandFeedback: "",
  logoOptions: [],
  hasGeneratedLogos: false,
  customLogoOptions: [],
  imagerySampleImages: [],

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

  updateSelectedLogo: (svg: string) =>
    set((state) => ({
      ...state,
      selectedLogo: svg,
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

  setSelectedLogo: (svg: string) => set({ selectedLogo: svg }),

  setSelectedColors: (colors: string[]) => set({ selectedColors: colors }),
  setSelectedFont: (font: string) => set({ selectedFont: font }),
  setSelectedImagerySet: (setId: string) => {
    alert(setId)
    set({ selectedImagerySet: setId })
  },
  setSelectedVoiceSet: (setId: string) => set({ selectedVoiceSet: setId }),
  setBrandVoices: (voices: BrandVoice[]) => set({ brandVoices: voices }),
  setBrandFeedback: (feedback: string) => set({ brandFeedback: feedback }),

  updateTargetAudience: (value: TargetAudience) => set((state) => ({
    brandDiscovery: {
      ...state.brandDiscovery,
      targetAudience: [value,...state.brandDiscovery.targetAudience]
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
  })),

  setLogoOptions: (options: Array<{ name: string; description: string; svg: string }>) => set({ logoOptions: options }),
  setHasGeneratedLogos: (hasGenerated: boolean) => set({ hasGeneratedLogos: hasGenerated }),
  setCustomLogoOptions: (options: Array<{ name: string; description: string; svg: string }>) => set({ customLogoOptions: options }),
  addCustomLogo: (logo: { name: string; description: string; svg: string }) => set((state) => ({
    customLogoOptions: [...state.customLogoOptions, logo]
  })),
  removeCustomLogo: (index: number) => set((state) => ({
    customLogoOptions: state.customLogoOptions.filter((_, i) => i !== index)
  })),
  setImagerySampleImages: (images: ImageryDirection[]) => set({ imagerySampleImages: images }),
}));

export default useBrandingStore;
