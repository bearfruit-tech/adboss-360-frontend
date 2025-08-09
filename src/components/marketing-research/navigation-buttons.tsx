"use client";

import { useState } from "react";

export default function NavigationButtons() {
  const [activeStep, setActiveStep] = useState(0); // This will be managed by a store later
  const [loading] = useState(false);
  const [nextStepLoading] = useState(false);

  const goToPreviousStep = () => {
    // This will be implemented with store later
    console.log("Previous step");
  };

  const goToNextStep = () => {
    // This will be implemented with store later
    console.log("Next step");
  };

  const handleSave = async () => {
    // This will be implemented with API calls later
    console.log("Save progress");
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
            onClick={handleSave}
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
            onClick={async () => {
              await handleSave();
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