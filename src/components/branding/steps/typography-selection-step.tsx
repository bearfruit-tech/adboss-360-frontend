"use client";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useBrandingStore from "@/stores/use-branding-store";
import { promptClaude } from "@/lib/claude";
import {
  TypographyClaudeResponse,
  TypographyFont,
} from "@/types/branding/typography-claude-response";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FONT_OPTIONS = [
  {
    id: "inter",
    name: "Inter",
    className: "font-sans",
    preview: {
      header: "The quick brown fox jumps over the lazy dog",
      subtitle: "A modern, clean typeface",
      content:
        "Perfect for digital interfaces and modern designs. Inter is known for its excellent readability and versatility.",
      small: "Small text example",
    },
  },
  {
    id: "lexend",
    name: "Lexend",
    className: "font-serif",
    preview: {
      header: "The quick brown fox jumps over the lazy dog",
      subtitle: "A contemporary, professional typeface",
      content:
        "Lexend offers a perfect balance between modern aesthetics and professional appearance. Great for corporate and creative projects.",
      small: "Small text example",
    },
  },
  {
    id: "poppins",
    name: "Poppins",
    className: "font-mono",
    preview: {
      header: "The quick brown fox jumps over the lazy dog",
      subtitle: "A geometric sans-serif typeface",
      content:
        "Poppins brings a geometric touch to your typography. Its clean lines and modern feel make it ideal for contemporary designs.",
      small: "Small text example",
    },
  },
];
export default function TypographySelectionStep() {
  const { selectedFont, setSelectedFont, brandDiscovery } = useBrandingStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingFonts, setLoadingFonts] = useState(false);
  const [fonts, setFonts] = useState<TypographyFont[]>([]);
  const [loadedFonts, setLoadedFonts] = useState(new Set());

  const handleCardClick = (fontId: string) => {
    setSelectedFont(fontId);
  };

  const fetchClaudeTypographySuggestions = async () => {
    try {
      setLoading(true)
      const response = await promptClaude<TypographyClaudeResponse>(
        "Please suggest 3 typography styles or font combinations that would suit this brand’s identity",
        ` 
        Each typography item should be an object with the following structure:

        {
          fontName: name of the font,
          fontStack: font stack,
          preview: {
            header: "The quick brown fox jumps over the lazy dog",
            subtitle: key properties or advantages of the font,
            content: a short font description (no more than 13 words),
            smallText: a small text example of exactly 3 words
          }
        }

        Return a JSON object with this exact structure:

        {
          "typographies": [ {}, {}, {} ],
          "description": "A detailed explanation of why these fonts were recommended for the brand"
        }
      `,
        brandDiscovery
      );
      if (response.success) {
        console.log(response.data?.typographies);
        if (response.data?.typographies) {
          setFonts(response.data.typographies);
          loadGoogleFont(response.data.typographies.map(font => font.fontName))
        }
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  };

  const loadGoogleFont = (fontNames: string[]) => {
    setLoading(false)
    setLoadingFonts(true)
    const fontParams = fontNames
      .map((font) => `family=${font.replace(/\s+/g, "+")}:wght@400;700`)
      .join("&");
    const googleFontsUrl = `https://fonts.googleapis.com/css2?${fontParams}&display=swap`;
    const existingLink = document.querySelector(
      `link[href*="fonts.googleapis.com"]`
    );
    if (existingLink) {
      existingLink.remove();
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = googleFontsUrl;

    link.onload = () => {
      setLoadedFonts(new Set(fontNames));
      setLoadingFonts(false);
    };
    link.onerror = () => {
      console.error("Failed to load Google Fonts");
      setLoadingFonts(false);
    };
    document.head.appendChild(link);
  };

   const isFontLoaded = (fontName:string) => {
    return loadedFonts.has(fontName);
  };

  useEffect(() => {
    fetchClaudeTypographySuggestions();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Choose Your Typography</h2>
        <p className="text-gray-600">
          Select a font that best represents your brand&apos;s personality and
          ensures readability across all your materials.
        </p>
      </div>

      {loading && (
          <>
          {[1,2,3].map((skel, i) => (
            <Skeleton key={i} className="w-full h-60"/>
          ))}
      </>)}

      {loadingFonts && (
        <>
          {[1,2,3].map((skell, i) => (
            <Card className="h-60" key={i}>
              <Skeleton className="ml-5 w-20 h-5"/>
              <div className="ml-8">
                <Skeleton className="ml-5 w-10/12 h-8 mb-4"/>
                <Skeleton className="ml-5 w-9/12 h-6 mb-4"/>
                <Skeleton className="ml-5 w-9/12 h-5 mb-4"/>
                <Skeleton className="ml-5 w-20 h-3"/>
              </div>
            </Card>
          ))}
        </>
      )}

      {(!loading && !loadingFonts) && (
        <RadioGroup
          value={selectedFont || ""}
          onValueChange={setSelectedFont}
          className="space-y-6"
        >
          {fonts.map((font) => (
            <Card
              key={font.fontName}
              className={`p-6 cursor-pointer transition-all duration-200 ${
                selectedFont === font.fontName
                  ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
                  : "hover:border-gray-400 hover:shadow-md"
              }`}
              onClick={() => handleCardClick(font.fontName)}
            >
              <div className="flex items-start gap-4">
                <RadioGroupItem value={font.fontName} id={font.fontName} className="mt-1" />
                <div className="flex-1 space-y-4">
                  <Label
                    htmlFor={font.fontName}
                    className="text-lg font-medium cursor-pointer block"
                  >
                    {font.fontName}
                  </Label>
                  <div className={`space-y-4 ${font.fontName}`}>
                    <h3 className="text-2xl font-semibold leading-tight">
                      {font.preview.header}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {font.preview.subtitle}
                    </p>
                    <p className="text-base leading-relaxed">
                      {font.preview.content}
                    </p>
                    <p className="text-sm text-gray-500">{font.preview.smallText}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </RadioGroup>
      )}

    </div>
  );
}
