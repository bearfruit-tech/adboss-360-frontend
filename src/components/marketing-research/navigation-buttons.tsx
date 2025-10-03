"use client";

import { useState } from "react";
import useMarketingResearchStore from "@/stores/use-marketing-research-store";

export default function NavigationButtons() {
  const [loading, setLoading] = useState(false);
  const [nextStepLoading, setNextStepLoading] = useState(false);
  const { activeStep, goToNextStep, goToPreviousStep, researchObjectives } = useMarketingResearchStore();

  const handleSave = async () => {
    // This will be implemented with API calls later
    console.log("Save progress");
    console.log(researchObjectives);
  };

  return (
    <div className="mt-8 flex justify-between">
      <button
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        disabled={activeStep === 0}
        onClick={goToPreviousStep}
      >
        Back
      </button>
      <div>
        {loading ? (
          <button disabled className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium opacity-50 cursor-not-allowed">
            Saving...
          </button>
        ) : (
          <button
            className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 cursor-pointer"
            onClick={async () => {
              setLoading(true);
              await handleSave();
              setLoading(false);
            }}
          >
            Save Progress
          </button>
        )}

        {nextStepLoading ? (
          <button disabled className="px-6 py-2 bg-primary text-white rounded-md font-medium opacity-50 cursor-not-allowed">
            Loading...
          </button>
        ) : (
          <button
            className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 cursor-pointer"
            disabled={activeStep === 3}
            onClick={async () => {
              setNextStepLoading(true);
              await handleSave();
              setNextStepLoading(false);
              goToNextStep();
            }}
          >
            Next Step
          </button>
        )}
      </div>
    </div>
  );
}