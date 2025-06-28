'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useBrandingStore from "@/stores/use-branding-store";
import { promptClaude } from "@/lib/claude";
import { LogoOptionClaudeResponse } from "@/types/branding/logo-options-claude-response";
import { Skeleton } from "@/components/ui/skeleton";

export default function LogoExplorationStep() {
  const [loading, setLoading] = useState(false);
  const { 
    selectedLogo, 
    setSelectedLogo, 
    brandDiscovery, 
    logoOptions, 
    setLogoOptions, 
    hasGeneratedLogos, 
    setHasGeneratedLogos 
  } = useBrandingStore();

  useEffect(() => {
    // Only generate logos if they haven't been generated yet
    if (!hasGeneratedLogos) {
      generateLogoOptions();
    }
  }, [hasGeneratedLogos]);

  const generateLogoOptions = async () => {
    try {
      setLoading(true);
      const result = await promptClaude<LogoOptionClaudeResponse>(
        "Generate 3 different logo design options for this brand, make them black and white, with black being #3D3D3D. Have a mix of some without the name and some with.",
        `
        Return a JSON object with this exact structure:
        {
          "logos": [
            {
              "name": "Logo Name",
              "description": "Description of the logo design and what it represents",
              "svg": "<svg>...</svg>"
            }
          ],
          "description": "Overall explanation of the logo options and design approach"
        }
        
        Create 3 distinct logo styles:
        1. A modern, minimalist design
        2. A classic, professional design  
        3. A creative, unique design
        
        Each SVG should be 200x200 viewBox with appropriate colors and styling that match the brand's personality.
        `,
        brandDiscovery
      );
      
      if (result.success && result.data?.logos) {
        setLogoOptions(result.data.logos);
        setHasGeneratedLogos(true);
      }
    } catch (error) {
      toast.error("Failed to generate logo options!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadLogo = (svg: string, name: string) => {
    try {
      // Create a blob from the SVG
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-logo.svg`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`${name} logo downloaded successfully!`);
    } catch (error) {
      toast.error("Failed to download logo!");
      console.error(error);
    }
  };
  
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
            <Button 
              onClick={() => {
                setHasGeneratedLogos(false);
                setLogoOptions([]);
                generateLogoOptions();
              }} 
              disabled={loading}
              variant="outline"
            >
              {loading ? "Generating..." : "Regenerate Logos"}
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-1">Select one logo style that resonates with your brand&apos;s vision.</p>
        </div>
        
        {loading || (!hasGeneratedLogos && logoOptions.length === 0) ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {logoOptions.map((logo, index) => (
              <div 
                key={index} 
                className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedLogo === logo.svg ? 'border-gradient-gold shadow-md' : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => setSelectedLogo(logo.svg)}
              >
                <div 
                  className="w-full h-64 flex items-center justify-center p-4"
                  dangerouslySetInnerHTML={{ __html: logo.svg }}
                />
                {selectedLogo === logo.svg && (
                  <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadLogo(logo.svg, logo.name);
                  }}
                  className="absolute top-2 left-2 h-10 w-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-sm transition-all duration-200"
                  title="Download logo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <div className="p-4 bg-gray-50">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{logo.name}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{logo.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-600">
          <p>Your selected logo style will influence the final design direction of your brand identity.</p>
        </div>
      </div>
    </>
  );
}