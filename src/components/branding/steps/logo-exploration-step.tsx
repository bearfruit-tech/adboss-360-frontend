'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useBrandingStore from "@/stores/use-branding-store";
import { promptClaude } from "@/lib/claude";
import { LogoOptionClaudeResponse } from "@/types/branding/logo-options-claude-response";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function LogoExplorationStep() {
  const [loading, setLoading] = useState(false);
  const { 
    selectedLogo, 
    setSelectedLogo, 
    brandDiscovery, 
    logoOptions, 
    setLogoOptions, 
    hasGeneratedLogos, 
    setHasGeneratedLogos,
    customLogoOptions,
    addCustomLogo,
    removeCustomLogo
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'image/svg+xml') {
      toast.error("Please upload an SVG file!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const svgContent = e.target?.result as string;
      if (svgContent) {
        const customLogo = {
          name: `Custom Logo ${customLogoOptions.length + 1}`,
          description: "Your custom uploaded logo design",
          svg: svgContent
        };
        addCustomLogo(customLogo);
        toast.success("Custom logo uploaded successfully!");
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };

  // Combine AI-generated logos with custom logos
  const allLogoOptions = [...logoOptions, ...customLogoOptions];
  
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
            <div className="flex space-x-3">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".svg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button variant="outline" asChild>
                  <span>Upload Custom Logo</span>
                </Button>
              </label>
              <Button 
                onClick={() => {
                  setHasGeneratedLogos(false);
                  setLogoOptions([]);
                  // Note: customLogoOptions are preserved
                  generateLogoOptions();
                }} 
                disabled={loading}
                variant="outline"
              >
                {loading ? "Generating..." : "Regenerate Logos"}
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Select one logo style that resonates with your brand&apos;s vision. You can also upload your own SVG logo.</p>
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
            {allLogoOptions.map((logo, index) => {
              const isCustomLogo = index >= logoOptions.length;
              return (
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="absolute top-2 left-14 h-10 w-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-sm transition-all duration-200"
                        title="View logo details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{logo.name}</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col items-center space-y-6">
                        <div className="w-full max-w-md h-96 flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                          <div 
                            className="w-full h-full flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: logo.svg }}
                          />
                        </div>
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{logo.name}</h3>
                          <p className="text-gray-600 leading-relaxed">{logo.description}</p>
                        </div>
                        <div className="flex space-x-3">
                          <Button
                            onClick={() => {
                              setSelectedLogo(logo.svg);
                              toast.success(`${logo.name} selected as your logo!`);
                            }}
                            variant={selectedLogo === logo.svg ? "default" : "outline"}
                            className="min-w-[120px]"
                          >
                            {selectedLogo === logo.svg ? "Selected" : "Select This Logo"}
                          </Button>
                          <Button
                            onClick={() => downloadLogo(logo.svg, logo.name)}
                            variant="outline"
                            className="min-w-[120px]"
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {isCustomLogo && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustomLogo(index - logoOptions.length);
                        toast.success("Custom logo removed!");
                      }}
                      className="absolute top-2 right-10 h-10 w-10 bg-red-500/90 hover:bg-red-500 rounded-full flex items-center justify-center text-white shadow-sm transition-all duration-200"
                      title="Remove custom logo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                  <div className="p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{logo.name}</h3>
                      {isCustomLogo && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Custom</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">{logo.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-600">
          <p>Your selected logo style will influence the final design direction of your brand identity.</p>
        </div>
      </div>
    </>
  );
}