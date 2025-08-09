"use client";

import MarketingResearchStepper from "./marketing-research-stepper";
import StepContent from "./step-content";
import NavigationButtons from "./navigation-buttons";
import useProjectStore from "@/stores/use-project-store";
import ClientProjectSelect from "../client-project-select";

export default function MarketingResearchModule() {
  const currentProject = useProjectStore(
    (state) => state.currentSelectedProject
  );

  return (
    <div>
      {!currentProject.id ? (
        <div className="flex items-center gap-4">
          <ClientProjectSelect />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-50">
          {/* Stepper */}
          <MarketingResearchStepper />

          {/* Main Content Area */}
          <main className="flex-grow flex">
            {/* Step Content */}
            <div className="flex-grow">
              <StepContent />

              {/* Navigation Buttons - placed within the content area for proper spacing */}
              <div className="max-w-4xl mx-auto px-6 pb-6">
                <NavigationButtons />
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
} 