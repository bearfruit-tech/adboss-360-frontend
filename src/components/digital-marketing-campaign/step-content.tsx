'use client'

import useDigitalMarketingCampaignStore from "@/stores/use-digital-marketing-campaign-store";
import Step1CampaignFoundation from './step-1-campaign-foundation';
import Step2ChannelStrategy from './step-2-channel-strategy';
import Step3CreativeContent from './step-3-creative-content';
import Step4TargetingSpecs from './step-4-targeting-specs';
import Step5CampaignCalendar from './step-5-campaign-calendar';
import Step6AnalyticsFramework from './step-6-analytics-framework';
import Step7CampaignPackage from './step-7-campaign-package';

// This component decides which step to show based on the activeStep
export default function StepContent() {
  const { activeStep } = useDigitalMarketingCampaignStore();

  // Render the appropriate step based on activeStep
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1CampaignFoundation />;
      case 1:
        return <Step2ChannelStrategy />;
      case 2:
        return <Step3CreativeContent />;
      case 3:
        return <Step4TargetingSpecs />;
      case 4:
        return <Step5CampaignCalendar />;
      case 5:
        return <Step6AnalyticsFramework />;
      case 6:
        return <Step7CampaignPackage />;
      default:
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
