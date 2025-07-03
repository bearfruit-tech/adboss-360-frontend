// src/components/branding/steps/brand-identity-suite-step.tsx
'use client'

import { useEffect, useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import useBrandingStore from "@/stores/use-branding-store";
import { promptClaude } from "@/lib/claude";
import { BrandDiscovery } from "@/types/branding/brand-discovery.interface";




function CoverSection({ selectedLogo, selectedColors }: { selectedLogo: string | null, selectedColors: string[] }) {
  // Helper to convert hex to RGB for brightness calculation
  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Helper to calculate brightness (0-255, where 0 is darkest)
  function getBrightness(hex: string) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  // Get darkest and lightest colors
  const darkestColor = selectedColors.length > 0 
    ? selectedColors.reduce((darkest, current) => 
        getBrightness(current) < getBrightness(darkest) ? current : darkest
      )
    : "#000000";
  
  const lightestColor = selectedColors.length > 0 
    ? selectedColors.reduce((lightest, current) => 
        getBrightness(current) > getBrightness(lightest) ? current : lightest
      )
    : "#ffffff";
  
  // Helper to replace fill color in SVG string with the lightest color
  function getLightestLogo(svg: string) {
    return svg.replace(/fill=["']#[0-9a-fA-F]{3,6}["']/g, `fill="${lightestColor}"`)
              .replace(/fill=["']currentColor["']/g, `fill="${lightestColor}"`);
  }

  return (
    <section className="mb-12">
      <div 
        className="w-full h-96 rounded-lg shadow-lg flex items-center justify-center"
        style={{ backgroundColor: darkestColor }}
      >
        {selectedLogo ? (
          <div
            className="w-80 h-80 flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: getLightestLogo(selectedLogo) }}
          />
        ) : (
          <div 
            className="w-80 h-80 flex items-center justify-center text-6xl font-bold"
            style={{ color: lightestColor }}
          >
            LOGO
          </div>
        )}
      </div>
    </section>
  );
}

function LogoSection({ selectedLogo, selectedColors }: { selectedLogo: string | null, selectedColors: string[] }) {
  // Helper to convert hex to RGB for brightness calculation
  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Helper to calculate brightness (0-255, where 0 is darkest)
  function getBrightness(hex: string) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  // Get darkest and lightest colors
  const darkestColor = selectedColors.length > 0 
    ? selectedColors.reduce((darkest, current) => 
        getBrightness(current) < getBrightness(darkest) ? current : darkest
      )
    : "#000000";
  
  const lightestColor = selectedColors.length > 0 
    ? selectedColors.reduce((lightest, current) => 
        getBrightness(current) > getBrightness(lightest) ? current : lightest
      )
    : "#ffffff";

  // Helper to replace fill color in SVG string
  function getColoredLogo(svg: string, color: string) {
    return svg.replace(/fill=["']#[0-9a-fA-F]{3,6}["']/g, `fill="${color}"`)
              .replace(/fill=["']currentColor["']/g, `fill="${color}"`);
  }

  return (
    <section className="mb-12">
      <div 
        className="relative border rounded-lg shadow-sm p-6 min-h-[100px]"
        style={{ 
          background: `linear-gradient(135deg, ${lightestColor}20 0%, ${darkestColor}10 100%)`
        }}
      >
        {/* Accent line */}
        <div 
          className="absolute left-0 top-6 h-12 w-2 rounded-r"
          style={{ backgroundColor: darkestColor }}
        />
        {/* Title */}
        <h2 
          className="text-3xl font-extrabold tracking-tight mb-4 ml-4"
          style={{ color: darkestColor }}
        >
          Logo
        </h2>
        
        {selectedLogo ? (
          <div className="flex justify-center items-center my-8">
            <div
              className="w-56 h-56 flex items-center justify-center border rounded bg-white shadow-lg"
              dangerouslySetInnerHTML={{ __html: selectedLogo }}
            />
          </div>
        ) : (
          <p className="text-gray-400">No logo selected.</p>
        )}
        
        <h4 className="text-lg font-medium mb-2">Color Variations</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {selectedLogo && selectedColors.map(color => (
            <div
              key={color}
              className="aspect-square flex items-center justify-center border rounded bg-white shadow-sm"
              dangerouslySetInnerHTML={{ __html: getColoredLogo(selectedLogo, color) }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandOverviewSection({ brandDiscovery, selectedColors }: { brandDiscovery: BrandDiscovery, selectedColors: string[] }) {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to convert hex to RGB for brightness calculation
  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Helper to calculate brightness (0-255, where 0 is darkest)
  function getBrightness(hex: string) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  // Get darkest and lightest colors
  const darkestColor = selectedColors.length > 0 
    ? selectedColors.reduce((darkest, current) => 
        getBrightness(current) < getBrightness(darkest) ? current : darkest
      )
    : "#000000";
  
  const lightestColor = selectedColors.length > 0 
    ? selectedColors.reduce((lightest, current) => 
        getBrightness(current) > getBrightness(lightest) ? current : lightest
      )
    : "#ffffff";

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      setError(null);
      try {
        const result = await promptClaude<string>(
          "Summarize the brand in 3-5 sentences for a brand guidelines document. Focus on the brand's mission, personality, target audience, and what makes it unique.",
          "Return a concise, professional summary as plain text.",
          brandDiscovery
        );
        if (result.success) {
          setSummary(result.rawResponse || "");
        } else {
          setError(result.error || "Failed to generate summary.");
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message || "Unknown error");
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, [brandDiscovery]);

  return (
    <section className="mb-12">
      <div 
        className="relative border rounded-lg shadow-sm p-6 min-h-[100px]"
        style={{ 
          background: `linear-gradient(135deg, ${lightestColor}20 0%, ${darkestColor}10 100%)`
        }}
      >
        {/* Accent line */}
        <div 
          className="absolute left-0 top-6 h-12 w-2 rounded-r"
          style={{ backgroundColor: darkestColor }}
        />
        {/* Title */}
        <h2 
          className="text-3xl font-extrabold tracking-tight mb-4 ml-4"
          style={{ color: darkestColor }}
        >
          Brand Overview
        </h2>
        {loading && <span className="text-gray-400">Generating summary...</span>}
        {error && <span className="text-red-500">{error}</span>}
        {!loading && !error && summary && <p className="text-gray-700 whitespace-pre-line">{summary}</p>}
      </div>
    </section>
  );
}

function ColorPaletteSection({ selectedColors }: { selectedColors: string[] }) {
  // Helper to convert hex to RGB for brightness calculation
  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Helper to calculate brightness (0-255, where 0 is darkest)
  function getBrightness(hex: string) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  // Get darkest and lightest colors
  const darkestColor = selectedColors.length > 0 
    ? selectedColors.reduce((darkest, current) => 
        getBrightness(current) < getBrightness(darkest) ? current : darkest
      )
    : "#000000";
  
  const lightestColor = selectedColors.length > 0 
    ? selectedColors.reduce((lightest, current) => 
        getBrightness(current) > getBrightness(lightest) ? current : lightest
      )
    : "#ffffff";

  return (
    <section className="mb-12">
      <div 
        className="relative border rounded-lg shadow-sm p-6 min-h-[100px]"
        style={{ 
          background: `linear-gradient(135deg, ${lightestColor}20 0%, ${darkestColor}10 100%)`
        }}
      >
        {/* Accent line */}
        <div 
          className="absolute left-0 top-6 h-12 w-2 rounded-r"
          style={{ backgroundColor: darkestColor }}
        />
        {/* Title */}
        <h2 
          className="text-3xl font-extrabold tracking-tight mb-4 ml-4"
          style={{ color: darkestColor }}
        >
          Color Palette
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          {selectedColors.map((color) => (
            <div key={color} className="flex flex-col items-center">
              <div
                className="w-full h-48 rounded-lg shadow-md border border-gray-200 mb-2"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm font-mono text-gray-600">{color}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TypographySection({ selectedFont }: { selectedFont: string }) {
  // Helper to convert hex to RGB for brightness calculation
  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Helper to calculate brightness (0-255, where 0 is darkest)
  function getBrightness(hex: string) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  // Get darkest and lightest colors from selectedColors (we'll need to pass this)
  const selectedColors = useBrandingStore().selectedColors;
  const darkestColor = selectedColors.length > 0 
    ? selectedColors.reduce((darkest, current) => 
        getBrightness(current) < getBrightness(darkest) ? current : darkest
      )
    : "#000000";
  
  const lightestColor = selectedColors.length > 0 
    ? selectedColors.reduce((lightest, current) => 
        getBrightness(current) > getBrightness(lightest) ? current : lightest
      )
    : "#ffffff";

  // Font family mapping
  const getFontFamily = (fontName: string) => {
    const fontMap: { [key: string]: string } = {
      'inter': 'Inter, sans-serif',
      'roboto': 'Roboto, sans-serif',
      'open-sans': 'Open Sans, sans-serif',
      'poppins': 'Poppins, sans-serif',
      'montserrat': 'Montserrat, sans-serif',
      'playfair-display': 'Playfair Display, serif',
      'merriweather': 'Merriweather, serif',
      'source-sans-pro': 'Source Sans Pro, sans-serif',
      'raleway': 'Raleway, sans-serif',
      'lato': 'Lato, sans-serif'
    };
    return fontMap[fontName] || 'Inter, sans-serif';
  };

  return (
    <section className="mb-12">
      <div 
        className="relative border rounded-lg shadow-sm p-6 min-h-[100px]"
        style={{ 
          background: `linear-gradient(135deg, ${lightestColor}20 0%, ${darkestColor}10 100%)`
        }}
      >
        {/* Accent line */}
        <div 
          className="absolute left-0 top-6 h-12 w-2 rounded-r"
          style={{ backgroundColor: darkestColor }}
        />
        {/* Title */}
        <h2 
          className="text-3xl font-extrabold tracking-tight mb-4 ml-4"
          style={{ color: darkestColor }}
        >
          Typography
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Selected Font: {selectedFont}</h3>
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Heading (48px)</h4>
                  <div 
                    className="text-5xl font-bold"
                    style={{ fontFamily: getFontFamily(selectedFont) }}
                  >
                    Brand Identity
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Subheading (24px)</h4>
                  <div 
                    className="text-2xl font-semibold"
                    style={{ fontFamily: getFontFamily(selectedFont) }}
                  >
                    Creating memorable experiences
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Body Text (16px)</h4>
                  <div 
                    className="text-base leading-relaxed"
                    style={{ fontFamily: getFontFamily(selectedFont) }}
                  >
                    This is how your brand will communicate with your audience. The typography you&apos;ve chosen reflects your brand&apos;s personality and ensures readability across all platforms.
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Caption (14px)</h4>
                  <div 
                    className="text-sm text-gray-600"
                    style={{ fontFamily: getFontFamily(selectedFont) }}
                  >
                    Supporting text and captions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandVoiceSection({ selectedVoiceSet, selectedColors }: { selectedVoiceSet: string | null, selectedColors: string[] }) {
  const { brandVoices } = useBrandingStore();
  
  // Helper to convert hex to RGB for brightness calculation
  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Helper to calculate brightness (0-255, where 0 is darkest)
  function getBrightness(hex: string) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  // Get darkest and lightest colors
  const darkestColor = selectedColors.length > 0 
    ? selectedColors.reduce((darkest, current) => 
        getBrightness(current) < getBrightness(darkest) ? current : darkest
      )
    : "#000000";
  
  const lightestColor = selectedColors.length > 0 
    ? selectedColors.reduce((lightest, current) => 
        getBrightness(current) > getBrightness(lightest) ? current : lightest
      )
    : "#ffffff";

  // Find the selected brand voice
  const selectedVoice = selectedVoiceSet ? brandVoices.find(voice => voice.id === selectedVoiceSet) : null;

  return (
    <section className="mb-12">
      <div 
        className="relative border rounded-lg shadow-sm p-6 min-h-[100px]"
        style={{ 
          background: `linear-gradient(135deg, ${lightestColor}20 0%, ${darkestColor}10 100%)`
        }}
      >
        {/* Accent line */}
        <div 
          className="absolute left-0 top-6 h-12 w-2 rounded-r"
          style={{ backgroundColor: darkestColor }}
        />
        {/* Title */}
        <h2 
          className="text-3xl font-extrabold tracking-tight mb-4 ml-4"
          style={{ color: darkestColor }}
        >
          Brand Voice
        </h2>
        
        <div className="space-y-6">
          {selectedVoice ? (
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{selectedVoice.name}</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedVoice.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Hero Text</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-lg font-semibold text-gray-900">{selectedVoice.hero}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Descriptive Text</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-base text-gray-700 leading-relaxed">{selectedVoice.descriptive}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Brand Persona</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-900 mb-1">Name & Age</p>
                        <p className="text-gray-700">{selectedVoice.persona.name}, {selectedVoice.persona.age} years old</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">Occupation</p>
                        <p className="text-gray-700">{selectedVoice.persona.occupation}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="font-medium text-gray-900 mb-1">Background</p>
                        <p className="text-gray-700">{selectedVoice.persona.background}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">Personality</p>
                        <p className="text-gray-700">{selectedVoice.persona.personality}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">Communication Style</p>
                        <p className="text-gray-700">{selectedVoice.persona.communicationStyle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <p className="text-gray-400 text-center">No brand voice selected.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ImageryDirectionSection({ selectedImagerySet, selectedColors }: { selectedImagerySet: string | null, selectedColors: string[] }) {
  const { imagerySampleImages } = useBrandingStore();
  // Helper to convert hex to RGB for brightness calculation
  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  // Helper to calculate brightness (0-255, where 0 is darkest)
  function getBrightness(hex: string) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  // Get darkest and lightest colors
  const darkestColor = selectedColors.length > 0 
    ? selectedColors.reduce((darkest, current) => 
        getBrightness(current) < getBrightness(darkest) ? current : darkest
      )
    : "#000000";
  
  const lightestColor = selectedColors.length > 0 
    ? selectedColors.reduce((lightest, current) => 
        getBrightness(current) > getBrightness(lightest) ? current : lightest
      )
    : "#ffffff";

  // Imagery direction descriptions
  const getImageryDescription = (imagerySet: string) => {
    const imageryMap: { [key: string]: { title: string; description: string; keywords: string[] } } = {
      'minimalist': {
        title: 'Minimalist & Clean',
        description: 'Simple, uncluttered visuals with plenty of white space. Focus on essential elements and clean lines.',
        keywords: ['Clean', 'Simple', 'Uncluttered', 'Essential', 'White Space']
      },
      'lifestyle': {
        title: 'Lifestyle & Authentic',
        description: 'Real, relatable moments that showcase people in natural, everyday situations.',
        keywords: ['Authentic', 'Relatable', 'Natural', 'Everyday', 'People']
      },
      'corporate': {
        title: 'Corporate & Professional',
        description: 'Polished, business-focused imagery that conveys trust, reliability, and professionalism.',
        keywords: ['Professional', 'Trust', 'Reliability', 'Business', 'Polished']
      },
      'creative': {
        title: 'Creative & Artistic',
        description: 'Bold, imaginative visuals with artistic flair and unique perspectives.',
        keywords: ['Artistic', 'Bold', 'Imaginative', 'Unique', 'Creative']
      },
      'nature': {
        title: 'Nature & Organic',
        description: 'Natural elements, organic textures, and earthy tones that connect with the environment.',
        keywords: ['Natural', 'Organic', 'Earthy', 'Environment', 'Textures']
      },
      'urban': {
        title: 'Urban & Modern',
        description: 'Contemporary city life, modern architecture, and dynamic urban environments.',
        keywords: ['Modern', 'Urban', 'Contemporary', 'Dynamic', 'City']
      }
    };
    return imageryMap[imagerySet] || {
      title: 'Custom Imagery Direction',
      description: 'A unique visual approach tailored to your brand&apos;s specific needs and personality.',
      keywords: ['Custom', 'Tailored', 'Unique', 'Brand-Specific']
    };
  };

  const imageryInfo = selectedImagerySet ? getImageryDescription(selectedImagerySet) : null;

  return (
    <section className="mb-12">
      <div 
        className="relative border rounded-lg shadow-sm p-6 min-h-[100px]"
        style={{ 
          background: `linear-gradient(135deg, ${lightestColor}20 0%, ${darkestColor}10 100%)`
        }}
      >
        {/* Accent line */}
        <div 
          className="absolute left-0 top-6 h-12 w-2 rounded-r"
          style={{ backgroundColor: darkestColor }}
        />
        {/* Title */}
        <h2 
          className="text-3xl font-extrabold tracking-tight mb-4 ml-4"
          style={{ color: darkestColor }}
        >
          Imagery Direction
        </h2>
        
        <div className="space-y-6">
          {imageryInfo ? (
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{imageryInfo.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{imageryInfo.description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Key Characteristics</h4>
                  <div className="flex flex-wrap gap-2">
                    {imageryInfo.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Visual Style Preview</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedImagerySet && imagerySampleImages.length > 0 ? (
                      // Find the selected imagery set and display its images
                      (() => {
                        const selectedSet = imagerySampleImages.find(set => set.id === selectedImagerySet);
                        if (selectedSet && selectedSet.images.length > 0) {
                          return selectedSet.images.map((image, index) => (
                            <div
                              key={image.id}
                              className="aspect-square rounded-lg overflow-hidden border border-gray-200"
                            >
                              <img
                                src={image.urls.regular}
                                alt={image.alt_description || `Imagery sample ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ));
                        } else {
                          // Fallback to placeholder images if no images found
                          return [1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50"
                            >
                              <div className="text-gray-400 text-xs text-center">
                                <div className="w-8 h-8 mx-auto mb-2 bg-gray-200 rounded"></div>
                                Image {i}
                              </div>
                            </div>
                          ));
                        }
                      })()
                    ) : (
                      // Show placeholder images when no imagery set is selected
                      [1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50"
                        >
                          <div className="text-gray-400 text-xs text-center">
                            <div className="w-8 h-8 mx-auto mb-2 bg-gray-200 rounded"></div>
                            Image {i}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <p className="text-gray-400 text-center">No imagery direction selected.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function BrandIdentitySuiteStep() {
  const { brandFeedback, setBrandFeedback, selectedColors, selectedLogo, brandDiscovery, selectedFont, selectedImagerySet, selectedVoiceSet } = useBrandingStore();

  return (
    <div className="space-y-8">
      <CoverSection selectedLogo={selectedLogo} selectedColors={selectedColors} />
      <BrandOverviewSection brandDiscovery={brandDiscovery} selectedColors={selectedColors} />
      <LogoSection selectedLogo={selectedLogo} selectedColors={selectedColors} />
      <ColorPaletteSection selectedColors={selectedColors} />
      <TypographySection selectedFont={selectedFont} />
      <ImageryDirectionSection selectedImagerySet={selectedImagerySet} selectedColors={selectedColors} />
      <BrandVoiceSection selectedVoiceSet={selectedVoiceSet} selectedColors={selectedColors} />
      <div className="space-y-8">
        {/* Feedback Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Feedback</h3>
          <Textarea
            placeholder="Share your thoughts about the brand identity. What works well? What could be improved?"
            value={brandFeedback}
            onChange={(e) => setBrandFeedback(e.target.value)}
            className="min-h-[200px]"
          />
          <p className="text-sm text-gray-500">
            Your feedback will help us refine the brand identity to better match your vision.
          </p>
        </div>
      </div>
    </div>
  );
}