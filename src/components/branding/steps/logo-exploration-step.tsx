'use client'

import { logoOptions } from "@/constants/branding_constants";
import useBrandingStore from "@/stores/use-branding-store";

export default function LogoExplorationStep() {
  const { selectedLogo, setSelectedLogo } = useBrandingStore();
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Logo Exploration</h1>
        <p className="mt-1 text-gray-600">Choose one logo style that best represents your brand&apos;s identity.</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Logo Options</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">Select one logo style that resonates with your brand&apos;s vision.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {logoOptions.map((logo, index) => (
            <div 
              key={index} 
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedLogo === logo ? 'border-gradient-gold shadow-md' : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => setSelectedLogo(logo)}
            >
              <div 
                className="w-full h-64 flex items-center justify-center p-4"
                dangerouslySetInnerHTML={{ __html: logo }}
              />
              {selectedLogo === logo && (
                <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-sm text-gray-600">
          <p>Your selected logo style will influence the final design direction of your brand identity.</p>
        </div>
      </div>
    </>
  );
}