"use client";

import useBrandingStore from "@/stores/use-branding-store";
import { valueOptions, logoOptions } from "@/constants/branding_constants";
import TypographyPreview from "./typography-preview";
import ColorPreview from "./color-preview";
import ImageryPreview from "./imagery-preview";
import BrandVoicePreview from "./brand-voice-preview";
import BrandFeedbackPreview from "./brand-feedback-preview";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

export default function BrandPreviewPanel() {
  const {
    activeStep,
    brandDiscovery,
    selectedImages,
    selectedLogo,
    selectedColors,
    selectedImagerySet,
    selectedVoiceSet,
    brandFeedback,
  } = useBrandingStore();

  const handleViewFullPreview = (): void => {
    // Preview logic would go here
    console.log("Opening full preview...");
  };

  return (
    <div className="w-80 border-l border-gray-200 bg-white">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Brand Preview</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          
          {/* {activeStep >= 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </h4>
              <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600">
                {brandDiscovery.targetAudience[0].ageRange[0] &&
                brandDiscovery.targetAudience[0].ageRange[1] ? (
                  <p>
                    {brandDiscovery.targetAudience[0].ageRange[0]}-
                    {brandDiscovery.targetAudience[0].ageRange[1]} year olds
                  </p>
                ) : (
                  <p>25-40 year old professionals</p>
                )}
                {brandDiscovery.targetAudience[0].gender && (
                  <p>{brandDiscovery.targetAudience[0].gender}</p>
                )}
                {brandDiscovery.targetAudience[0].education && (
                  <p>{brandDiscovery.targetAudience[0].education} Level</p>
                )}
                {brandDiscovery.targetAudience[0].income && (
                  <p>{brandDiscovery.targetAudience[0].income} Income level</p>
                )}
                <p>
                  {brandDiscovery.targetAudience[0].location ||
                    "Urban, tech-savvy"}
                </p>
              </div>
            </div>
          )}
           */}

          {activeStep >= 0 && brandDiscovery.industry && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Industry
              </h4>
              <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600">
                <p>{brandDiscovery.industry}</p>
              </div>
            </div>
          )}

          {activeStep >= 0 && brandDiscovery.values.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Core Values
              </h4>
              <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600">
                <div className="flex flex-wrap gap-1">
                  {brandDiscovery.values.map((valueId) => {
                    const value = valueOptions.find((v) => v.id === valueId);
                    return (
                      <span
                        key={valueId}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                      >
                        {value?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeStep >= 0 &&
            (brandDiscovery.competitors || brandDiscovery.differentiation) && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Competitors
                </h4>
                <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600">
                  <p>{brandDiscovery.competitors}</p>
                  <p className="pt-0.5">{brandDiscovery.differentiation}</p>
                </div>
              </div>
            )}

          {activeStep >= 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Brand&apos;s personality
              </h4>
              <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600">
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-sm">Formal</Label>
                    <Label className="text-sm">Casual</Label>
                  </div>
                  <Slider
                    value={[brandDiscovery.personality.formalCasual]}
                    max={100}
                    step={1}
                    disabled
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-sm">Traditional</Label>
                    <Label className="text-sm">Modern</Label>
                  </div>
                  <Slider
                    value={[brandDiscovery.personality.traditionalModern]}
                    max={100}
                    step={1}
                    disabled
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <Label className="text-sm">Serious</Label>
                    <Label className="text-sm">Playful</Label>
                  </div>
                  <Slider
                    value={[brandDiscovery.personality.seriousPlayful]}
                    max={100}
                    step={1}
                    disabled
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep >= 0 && brandDiscovery.problemsSolved.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Problems your solve
              </h4>
              <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600">
                <div className="flex flex-wrap gap-1">
                  {brandDiscovery.problemsSolved.map((valueId) => {
                    return (
                      <span
                        key={valueId}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                      >
                        {valueId}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeStep >= 0 &&
            (brandDiscovery.longTermGoals || brandDiscovery.shortTermGoals) && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Business goals
                </h4>
                <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600">
                  <p>{brandDiscovery.shortTermGoals}</p>
                  <p className="pt-0.5">{brandDiscovery.longTermGoals}</p>
                </div>
              </div>
            )}

          {activeStep >= 0 &&
            (brandDiscovery.visualAversions ||
              brandDiscovery.visualPreferences) && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Visual elements
                </h4>
                <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600">
                  {brandDiscovery.visualPreferences && (
                    <div className="mb-3">
                      <h5 className="text-sm font-small text-gray-700 mb-0.5 underline">
                        Elements to include
                      </h5>
                      <p>{brandDiscovery.visualPreferences}</p>
                    </div>
                  )}
                  {brandDiscovery.visualAversions && (
                    <div className="">
                      <h5 className="text-sm font-small text-gray-700 mb-0.5 underline">
                        Elements to avoid
                      </h5>
                      <p className="pt-0.5">{brandDiscovery.visualAversions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          {activeStep >= 1 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Visual Direction
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {selectedImages.map((index) => (
                  <div
                    key={index}
                    className="rounded-md overflow-hidden border border-gray-200"
                  >
                    <img
                      src="60.png"
                      alt={`Selected image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeStep >= 2 && selectedLogo !== null && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Selected Logo Style
              </h4>
              <div className="rounded-md overflow-hidden border border-gray-200">
                <img
                  src={logoOptions[selectedLogo]}
                  alt="Selected logo style"
                  className="w-full h-48 object-contain p-4"
                />
              </div>
            </div>
          )}

          {activeStep >= 3 && selectedColors.length > 0 && <ColorPreview />}

          {activeStep >= 4 && <TypographyPreview />}
          {activeStep >= 1 && selectedImagerySet && <ImageryPreview />}
          {activeStep >= 5 && selectedVoiceSet && <BrandVoicePreview />}
          {activeStep >= 6 && brandFeedback && <BrandFeedbackPreview />}

          <div className="border-t border-gray-200 pt-4">
            <button
              className="w-full px-4 py-2 bg-gray-100 rounded-md text-gray-700 font-medium hover:bg-gray-200 text-sm"
              onClick={handleViewFullPreview}
            >
              View Full Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
