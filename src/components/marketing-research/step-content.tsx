'use client'

import { useState } from "react";
import Step1ResearchObjectives from './step-1-research-objectives';
import Step2ResearchDesign from './step-2-research-design';
import Step3DataCollection from './step-3-data-collection';
import Step4AnalysisReporting from './step-4-analysis-reporting';

// This component decides which step to show based on the activeStep
export default function StepContent() {
  const [activeStep] = useState(0); // This will be managed by a store later
  
  // Render the appropriate step based on activeStep
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1ResearchObjectives />;
      case 1:
        return <Step2ResearchDesign />;
      case 2:
        return <Step3DataCollection />;
      case 3:
        return <Step4AnalysisReporting />;
      default:
        // Placeholder for future steps
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-lg text-gray-500">Content for step {activeStep + 1} will be implemented soon.</p>
          </div>
        );
    }
  };
  
  return (
    <section className="flex-grow py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {renderStep()}
      </div>
    </section>
  );
}