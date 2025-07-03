export interface BrandImage {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  sourceUrl?: string;
  author?: string;
  source: string;
  imageType: ImageType;
  styleCategory?: string;
  tags: string[];
  demographics: string[];
  relevanceScore?: number;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

export type ImageType =
  | "brand_bento"
  | "logo"
  | "identity"
  | "website"
  | "packaging"
  | "business_card"
  | "font"
  | "color_palette";

export interface Industry {
  id: string;
  name: string;
  keywords: string[];
}

export interface BrandPersonality {
  id: string;
  name: string;
  personalityType: "formal_casual" | "traditional_modern" | "serious_playful";
  scoreRange: [number, number];
  keywords: string[];
}

export interface BrandImageSearchRequest {
  industry?: string;
  personality?: {
    formalCasual?: number;
    traditionalModern?: number;
    seriousPlayful?: number;
  };
  values?: string[];
  visualPreferences?: string;
  limit?: number;
}

export interface BrandImageSearchResponse {
  images: BrandImage[];
  totalMatches: number;
  filteredCount: number;
  source: "curated" | "unsplash";
}

export interface ManualImageEntry {
  imageUrl: string;
  title: string;
  source: string;
  sourceUrl?: string;
  industry: string;
  imageType: ImageType;
  tags: string[];
  demographics: string[];
  description?: string;
}

// Constants for the UI
export const IMAGE_TYPES: Array<{ id: ImageType; label: string }> = [
  { id: "brand_bento", label: "Brand Bento" },
  { id: "logo", label: "Logo" },
  { id: "identity", label: "Brand Identity" },
  { id: "website", label: "Website" },
  { id: "packaging", label: "Packaging" },
  { id: "business_card", label: "Business Card" },
  { id: "font", label: "Typography" },
  { id: "color_palette", label: "Color Palette" },
];

export const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Construction",
  "Security",
  "Retail",
  "Food & Beverage",
  "Professional Services",
  "Real Estate",
  "Entertainment",
  "Non-Profit",
  "Government",
  "Manufacturing",
  "Transportation",
  "Energy",
  "Fashion",
  "Beauty & Wellness",
];

export const STYLE_TAGS = [
  "minimal",
  "modern",
  "vintage",
  "corporate",
  "startup",
  "luxury",
  "playful",
  "professional",
  "creative",
  "bold",
  "colorful",
  "monochrome",
  "bright",
  "dark",
  "organic",
  "geometric",
  "elegant",
  "rustic",
];

export const DEMOGRAPHICS = [
  "african",
  "south_african",
  "local_community",
  "international",
  "startup",
  "enterprise",
  "corporate",
  "creative_agency",
  "small_business",
  "non_profit",
  "government",
];
