'use client'

import useDigitalMarketingCampaignStore from "@/stores/use-digital-marketing-campaign-store";

const digitalMarketingCampaignSteps = [
  { id: 0, title: "Campaign Foundation & Strategy" },
  { id: 1, title: "Channel Strategy & Budget" },
  { id: 2, title: "Creative & Content" },
  { id: 3, title: "Targeting & Technical Specs" },
  { id: 4, title: "Campaign Calendar" },
  { id: 5, title: "Analytics Framework" },
  { id: 6, title: "Campaign Package" }
];

export default function DigitalMarketingCampaignStepper() {
  const { activeStep } = useDigitalMarketingCampaignStore();

  return (
    <div className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {digitalMarketingCampaignSteps.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="relative w-full flex items-center">
                <div className="flex flex-col items-center w-full">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium z-5
                    ${step.id < activeStep ? 'bg-primary text-white' :
                      step.id === activeStep ? 'bg-primary text-white' :
                      'bg-gray-200 text-gray-500'}`}
                  >
                    {step.id < activeStep ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.id + 1
                    )}
                  </div>
                  <div className={`h-10 mt-2 text-xs font-medium text-center ${step.id === activeStep ? 'text-primary' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                </div>
                {step.id < digitalMarketingCampaignSteps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 h-0.5 w-full -translate-y-1/2
                      ${step.id < activeStep ? 'bg-primary' : 'bg-gray-200'}`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
