'use client'

import { Button } from "@/components/ui/button";
import useDigitalMarketingCampaignStore from "@/stores/use-digital-marketing-campaign-store";

export default function NavigationButtons() {
  const { activeStep, goToNextStep, goToPreviousStep } = useDigitalMarketingCampaignStore();

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === 6;

  return (
    <div className="flex justify-between items-center mt-8">
      <Button
        onClick={goToPreviousStep}
        disabled={isFirstStep}
        variant="outline"
        className="px-6"
      >
        Previous
      </Button>

      <div className="text-sm text-gray-600">
        Step {activeStep + 1} of 7
      </div>

      <Button
        onClick={goToNextStep}
        disabled={isLastStep}
        className="px-6"
      >
        {isLastStep ? 'Complete' : 'Next'}
      </Button>
    </div>
  );
}
