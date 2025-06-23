"use client";

import useBrandingStore from "@/stores/use-branding-store";
import { BrandingStep } from "@/types/branding/branding-step.enum"
import useProjectStore from "@/stores/use-project-store";
import { APIRoutes } from "@/constants/api_routes";
import { authorizedApiRequest } from "@/api";
import { HttpMethods } from "@/constants/api_methods";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  hasBrand: boolean
}

export default function NavigationButtons({ hasBrand }: Props) {
  const [loading, setloading] = useState<boolean>(false);
  const { activeStep, goToNextStep, goToPreviousStep } = useBrandingStore();
  const {
    brandDiscovery,
    selectedImages,
    selectedLogo,
    selectedColors,
    selectedFont,
    selectedImagerySet,
    selectedVoiceSet,
    brandFeedback,
  } = useBrandingStore();
  const currentProject = useProjectStore(
    (state) => state.currentSelectedProject
  );

  const getBrandingStep = (): BrandingStep => {
    let step: BrandingStep = BrandingStep.BRAND_DISCOVERY;
    switch (activeStep) {
      case 0:
        step = BrandingStep.BRAND_DISCOVERY;
        break
      case 1:
        step = BrandingStep.VISUAL_INSPIRATION;
        break
      case 2:
        step = BrandingStep.LOGO_EXPLORATION;
        break
      case 3:
        step = BrandingStep.COLOR_HARMONY;
        break
      case 4:
        step = BrandingStep.TYPOGRAPHY_SELECTION;
        break
      case 5:
        step = BrandingStep.IMAGERY_DIRECTION;
        break
      case 6:
        step = BrandingStep.BRAND_VOICE;
        break
      case 7:
        step = BrandingStep.BRAND_IDENTITY_SUITE;
        break
    }
    return step;
  };

  // Add type for the click handler
  const handleSaveClick = async (): Promise<void> => {
    const url = `${APIRoutes.ORGANIZATIONS.GET_ORGANIZATION}/branding`;
    try {
      setloading(true)
      if (!hasBrand) {
        const branding = await authorizedApiRequest(HttpMethods.POST, url, {
          projectId: currentProject.id,
          brandingStep: getBrandingStep(),
          metadata: {
            brandDiscovery: {
              ...brandDiscovery,
            },
            selectedImages,
            selectedLogo,
            selectedColors,
            selectedFont,
            selectedImagerySet,
            selectedVoiceSet,
            brandFeedback,
          },
        });
        console.log(branding.data);
        setloading(false);
      } else {
        const branding = await authorizedApiRequest(HttpMethods.PUT, url, {
          projectId: currentProject.id,
          brandingStep: getBrandingStep(),
          metadata: {
            brandDiscovery: {
              ...brandDiscovery,
            },
            selectedImages,
            selectedLogo,
            selectedColors,
            selectedFont,
            selectedImagerySet,
            selectedVoiceSet,
            brandFeedback,
          },
        });
        console.log(branding.data);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <div className="mt-8 flex justify-between">
      <button
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={activeStep === 0}
        onClick={goToPreviousStep}
      >
        Back
      </button>
      <div>
        {loading ? (
          <>
            {hasBrand ? (
              <Button disabled className="mr-4 py-5">
                <Loader2 className="animate-spin" />
                Wait, Updating
              </Button>
            ) : (
              <Button disabled className="mr-4 py-5">
                <Loader2 className="animate-spin" />
                Wait, Saving
              </Button>
            )}
          </>
        ) : (
          <button
            className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
            onClick={handleSaveClick}
          >
            Save Progress
          </button>
        )}

        <button
          className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90"
          onClick={goToNextStep}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
