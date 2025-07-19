'use client'

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"
import useBrandingStore from "@/stores/use-branding-store";
import { Download, Loader2 } from "lucide-react";
import { CoverSection } from "../brand-identity-sections/cover-section";
import { BrandOverviewSection } from "../brand-identity-sections/brand-overview-section";
import { LogoSection } from "../brand-identity-sections/logo-section";
import { ColorPaletteSection } from "../brand-identity-sections/color-palette-section";
import { TypographySection } from "../brand-identity-sections/typography-section";
import { BrandVoiceSection } from "../brand-identity-sections/brand-voice-section";
import { ImageryDirectionSection } from "../brand-identity-sections/imagery-direction-section";


export default function BrandIdentitySuiteStep() {

  const [exportLoading, setExportLoading] = useState(false);
  const {
    brandFeedback,
    setBrandFeedback,
    selectedColors,
    selectedLogo,
    brandDiscovery,
    selectedFont,
    selectedImagerySet,
    selectedImageryDirection,
    selectedVoiceSet,
    brandVoices,
    imagerySampleImages,
    summary,
  } = useBrandingStore();

  // Find selected brand voice
  const selectedBrandVoice = selectedVoiceSet
    ? brandVoices.find((voice) => voice.id === selectedVoiceSet)
    : undefined;

  // Find selected imagery set images
  let imageryUrls: string[] = [];
  if (selectedImagerySet && imagerySampleImages.length > 0) {
    const set = imagerySampleImages.find((set) => set.id === selectedImagerySet);
    if (set && set.images) {
      imageryUrls = set.images.map((img) => img.urls.regular);
    }
  }

  // Convert SVG logo to data URL if present
  let logoUrl: string | undefined = undefined;
  if (selectedLogo) {
    // Create a data URL for the SVG string
    logoUrl = `data:image/svg+xml;utf8,${encodeURIComponent(selectedLogo)}`;
  }

  // Brand summary (from BrandOverviewSection)
  // For now, just use businessDescription as a placeholder

  const handleExport = async () => {
    setExportLoading(true);
    const response = await fetch('/api/export-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        selectedLogo,
        selectedColors,
        brandDiscovery,
        summary,
        selectedFont,
        selectedBrandVoice: brandVoices.find(voice => voice.id === selectedVoiceSet),
        selectedImageryDirection,
      }),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brand-identity-suite.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
    setExportLoading(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-4">
        <Button
              className="px-4 py-2 bg-primary text-white rounded hover:shadow-lg transition cursor-pointer"
              disabled={exportLoading}
              type="button"
              onClick={handleExport}
              
            >
              {exportLoading ? "Exporting PDF..." : "Export as PDF"}
              {exportLoading ? <Loader2 className="animate-spin" /> : <Download size={8} strokeWidth={3} />}
        </Button>
      </div>
      <CoverSection selectedLogo={selectedLogo} selectedColors={selectedColors} />
      <BrandOverviewSection brandDiscovery={brandDiscovery} selectedColors={selectedColors} />
      <LogoSection selectedLogo={selectedLogo} selectedColors={selectedColors} />
      <ColorPaletteSection selectedColors={selectedColors} />
      <TypographySection selectedFont={selectedFont} />
      <ImageryDirectionSection selectedImageryDirection={selectedImageryDirection} selectedColors={selectedColors} />
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