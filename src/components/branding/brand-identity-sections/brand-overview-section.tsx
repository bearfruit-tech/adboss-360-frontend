import { promptClaude } from "@/lib/claude";
import { BrandDiscovery } from "@/types/branding/brand-discovery.interface";
import { useEffect, useState } from "react";
import useBrandingStore from "@/stores/use-branding-store";

export function BrandOverviewSection({ brandDiscovery, selectedColors }: { brandDiscovery: BrandDiscovery, selectedColors: string[] }) {
    
    const {summary, setSummary} = useBrandingStore();
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
    }, [brandDiscovery, setSummary]);
  
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

          {/* Labeled brandDiscovery values */}
          <div className="mb-4 ml-4">
            {brandDiscovery.businessName && (
              <div className="mb-1">
                <span className="font-semibold">Business Name: </span>
                <span>{brandDiscovery.businessName}</span>
              </div>
            )}
            {brandDiscovery.businessDescription && (
              <div className="mb-1">
                <span className="font-semibold">Business Description: </span>
                <span>{brandDiscovery.businessDescription}</span>
              </div>
            )}
            {brandDiscovery.industry && (
              <div className="mb-1">
                <span className="font-semibold">Industry: </span>
                <span>{brandDiscovery.industry}</span>
              </div>
            )}
          </div>

          {loading && <span className="text-gray-400">Generating summary...</span>}
          {error && <span className="text-red-500">{error}</span>}
          {!loading && !error && summary && <p className="text-gray-700 whitespace-pre-line">{summary}</p>}
        </div>
      </section>
    );
  }
  