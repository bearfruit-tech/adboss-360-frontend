"use client";

import BrandingStepper from "./branding-stepper";
import StepContent from "./step-content";
import NavigationButtons from "./navigation-buttons";
import BrandPreviewPanel from "./brand-preview-panel";
import useProjectStore from "@/stores/use-project-store";
import { useEffect, useState } from "react";
import { APIRoutes } from "@/constants/api_routes";
import { authorizedApiRequest } from "@/api";
import { HttpMethods } from "@/constants/api_methods";
import ClientProjectSelect from "../client-project-select";
import useBrandingStore from "@/stores/use-branding-store";
import { BrandingStep } from "@/types/branding/branding-step.enum";
import { BrandDiscovery } from "@/types/branding/brand-discovery.interface";

export interface Brand {
  brandDiscovery?: BrandDiscovery;
  selectedImages?: number[];
  selectedLogo?: null;

  selectedColors?: string[];

  selectedFont?: string;
  selectedImagerySet?: null;
  selectedVoiceSet?: null;
  brandFeedback?: string;
}

export default function BrandingModule() {
  const [hasBrand, setHasBrand] = useState<boolean>(false);
  const {
    setActiveStep,
    UpdateBrandingStep,
    updateValues,
    updateBrandDiscovery,
    updateProblems,
    updateSelectedImages,
    setSelectedColors,
    setSelectedFont,
    updateImagerySet,
    updateVoiceSet,
  } = useBrandingStore();

  const currentProject = useProjectStore(
    (state) => state.currentSelectedProject
  );

  useEffect(() => {
    if (currentProject.id) {
      getBranding(currentProject.id);
    }
  }, [currentProject]);

  const updateActiveStepFromSavedStep = (step: BrandingStep) => {
    switch(step){
      case BrandingStep.BRAND_DISCOVERY:
        setActiveStep(0)
        break
      case BrandingStep.VISUAL_INSPIRATION:
        setActiveStep(1)
        break
      case BrandingStep.LOGO_EXPLORATION:
        setActiveStep(2)
        break
      case BrandingStep.COLOR_HARMONY:
        setActiveStep(3)
        break
      case BrandingStep.TYPOGRAPHY_SELECTION:
        setActiveStep(4)
        break
      case BrandingStep.IMAGERY_DIRECTION:
        setActiveStep(5)
        break
      case BrandingStep.BRAND_VOICE:
        setActiveStep(6)
        break
      case BrandingStep.BRAND_IDENTITY_SUITE:
        setActiveStep(7)
        break
    }
  }

  const getBranding = async (id: string) => {
    try {
      const url = `${APIRoutes.ORGANIZATIONS.GET_ORGANIZATION}/branding/${id}`;
      const branding = await authorizedApiRequest(HttpMethods.GET, url, {});
      setHasBrand(true);
      if (branding.data) {
        const brandingData: Brand = branding.data.metadata;
        const brandingSavedStep: BrandingStep = branding.data.brandingStep;
        
        // updating current branding step
        if(brandingSavedStep){
          UpdateBrandingStep(brandingSavedStep)
          // update active step 
          updateActiveStepFromSavedStep(brandingSavedStep)
        }
        
        // updating target audience age range
        if (
          brandingData.brandDiscovery?.targetAudience?.ageRange &&
          brandingData.brandDiscovery.targetAudience.ageRange.length > 0
        ) {
          updateBrandDiscovery(
            "targetAudience.ageRange",
            brandingData.brandDiscovery.targetAudience.ageRange
          );
        }
        // updating target audience gender
        if (brandingData.brandDiscovery?.targetAudience?.gender) {
          updateBrandDiscovery(
            "targetAudience.gender",
            brandingData.brandDiscovery.targetAudience.gender
          );
        }
        // updating target audience target income
        if (brandingData.brandDiscovery?.targetAudience?.income) {
          updateBrandDiscovery(
            "targetAudience.income",
            brandingData.brandDiscovery.targetAudience.income
          );
        }
        // updating target audience target education level
        if (brandingData.brandDiscovery?.targetAudience?.education) {
          updateBrandDiscovery(
            "targetAudience.education",
            brandingData.brandDiscovery.targetAudience.education
          );
        }
        // updating target audience location
        if (brandingData.brandDiscovery?.targetAudience?.location) {
          updateBrandDiscovery(
            "targetAudience.location",
            brandingData.brandDiscovery.targetAudience.location
          );
        }
        // udpdating industry
        if (brandingData.brandDiscovery?.industry) {
          updateBrandDiscovery(
            "industry",
            brandingData.brandDiscovery.industry
          );
        }
        // updating values
        if (
          brandingData.brandDiscovery?.values &&
          brandingData.brandDiscovery?.values?.length > 0
        ) {
          updateValues(brandingData.brandDiscovery.values);
        }
        // updating competitors
        if (brandingData.brandDiscovery?.competitors) {
          updateBrandDiscovery(
            "competitors",
            brandingData.brandDiscovery.competitors
          );
        }
        // updating Differentiation
        if (brandingData.brandDiscovery?.differentiation) {
          updateBrandDiscovery(
            "differentiation",
            brandingData.brandDiscovery.differentiation
          );
        }
        // updating personality formal casual
        if (brandingData.brandDiscovery?.personality?.formalCasual) {
          updateBrandDiscovery(
            "personality.formalCasual",
            brandingData.brandDiscovery.personality.formalCasual
          );
        }
        // updating personality traditional modern
        if (brandingData.brandDiscovery?.personality?.traditionalModern) {
          updateBrandDiscovery(
            "personality.traditionalModern",
            brandingData.brandDiscovery.personality.traditionalModern
          );
        }
        // updating personality traditional
        if (brandingData.brandDiscovery?.personality?.seriousPlayful) {
          updateBrandDiscovery(
            "personality.seriousPlayful",
            brandingData.brandDiscovery.personality.seriousPlayful
          );
        }
        // updating problems solved
        if (
          brandingData.brandDiscovery?.problemsSolved &&
          brandingData.brandDiscovery?.problemsSolved?.length > 0
        ) {
          updateProblems(brandingData.brandDiscovery.problemsSolved);
        }
        // updating short term goals
        if (brandingData.brandDiscovery?.shortTermGoals) {
          updateBrandDiscovery(
            "shortTermGoals",
            brandingData.brandDiscovery.shortTermGoals
          );
        }
        // updating long term goals
        if (brandingData.brandDiscovery?.longTermGoals) {
          updateBrandDiscovery(
            "longTermGoals",
            brandingData.brandDiscovery.longTermGoals
          );
        }
        // updating visual preferences
        if (brandingData.brandDiscovery?.visualPreferences) {
          updateBrandDiscovery(
            "visualPreferences",
            brandingData.brandDiscovery.visualPreferences
          );
        }
        // updating visual preferences
        if (brandingData.brandDiscovery?.visualAversions) {
          updateBrandDiscovery(
            "visualAversions",
            brandingData.brandDiscovery.visualAversions
          );
        }
        // updating selected images
        if (
          brandingData.selectedImages &&
          brandingData.selectedImages.length > 0
        ) {
          updateSelectedImages(brandingData.selectedImages);
        }
        // updating selected colors
        if (
          brandingData.selectedColors &&
          brandingData.selectedColors.length > 0
        ) {
          setSelectedColors(brandingData.selectedColors);
        }
        // updating selected font
        if (brandingData.selectedFont) {
          setSelectedFont(brandingData.selectedFont);
        }
        // update selected imagery set
        if (brandingData.selectedImagerySet) {
          updateImagerySet(brandingData.selectedImagerySet);
        }
        // update voice set
        if (brandingData.selectedVoiceSet) {
          updateVoiceSet(brandingData.selectedVoiceSet);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!currentProject.id && !hasBrand ? (
        <div className="flex items-center gap-4">
          <ClientProjectSelect />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-50">
          {/* Stepper */}
          <BrandingStepper />

          {/* Main Content Area */}
          <main className="flex-grow flex">
            {/* Step Content */}
            <div className="flex-grow">
              <StepContent/>

              {/* Navigation Buttons - placed within the content area for proper spacing */}
              <div className="max-w-4xl mx-auto px-6 pb-6">
                <NavigationButtons hasBrand={hasBrand} />
              </div>
            </div>

            {/* Side Panel */}
            <BrandPreviewPanel />
          </main>
        </div>
      )}
    </div>
  );
}
