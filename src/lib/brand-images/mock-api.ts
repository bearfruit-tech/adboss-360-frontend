import {
  BrandImage,
  BrandImageSearchRequest,
  BrandImageSearchResponse,
  ManualImageEntry,
} from "@/types/brand-images";

const MOCK_CURATED_IMAGES: BrandImage[] = [
  {
    id: 1,
    title: "Modern Healthcare Brand Identity",
    description:
      "Clean, professional healthcare branding with African representation",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    sourceUrl: "https://dribbble.com/shots/healthcare-brand",
    author: "Design Studio",
    source: "dribbble",
    imageType: "identity",
    styleCategory: "modern",
    tags: ["modern", "professional", "healthcare", "clean"],
    demographics: ["african", "professional", "corporate"],
    relevanceScore: 95,
    isActive: true,
  },
  {
    id: 2,
    title: "African Tech Startup Brand Bento",
    description: "Vibrant tech startup branding with local cultural elements",
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
    sourceUrl: "https://behance.net/gallery/tech-startup",
    author: "Creative Agency",
    source: "behance",
    imageType: "brand_bento",
    styleCategory: "modern",
    tags: ["modern", "startup", "tech", "vibrant", "colorful"],
    demographics: ["african", "startup", "local_community"],
    relevanceScore: 92,
    isActive: true,
  },
  {
    id: 3,
    title: "Professional Security Company Logo",
    description: "Strong, trustworthy security company branding",
    imageUrl:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
    sourceUrl: "https://rebrandgallery.com/security-logo",
    author: "Brand Designer",
    source: "rebrand_gallery",
    imageType: "logo",
    styleCategory: "professional",
    tags: ["professional", "security", "bold", "trustworthy"],
    demographics: ["south_african", "corporate", "enterprise"],
    relevanceScore: 88,
    isActive: true,
  },
  {
    id: 4,
    title: "Local Restaurant Brand Identity",
    description: "Warm, inviting restaurant branding with local flavor",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop",
    sourceUrl: "https://pinterest.com/restaurant-brand",
    author: "Food Designer",
    source: "pinterest",
    imageType: "identity",
    styleCategory: "organic",
    tags: ["organic", "warm", "local", "food", "inviting"],
    demographics: ["african", "local_community", "small_business"],
    relevanceScore: 85,
    isActive: true,
  },
  {
    id: 5,
    title: "Financial Services Brand Bento",
    description: "Professional financial services with modern approach",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop",
    sourceUrl: "https://dribbble.com/shots/finance-brand",
    author: "Finance Design Co",
    source: "dribbble",
    imageType: "brand_bento",
    styleCategory: "professional",
    tags: ["professional", "finance", "modern", "trustworthy"],
    demographics: ["african", "corporate", "professional"],
    relevanceScore: 90,
    isActive: true,
  },
  {
    id: 6,
    title: "Education Platform Brand Identity",
    description: "Friendly, approachable education branding",
    imageUrl:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    sourceUrl: "https://behance.net/gallery/education-brand",
    author: "Edu Creative",
    source: "behance",
    imageType: "identity",
    styleCategory: "friendly",
    tags: ["friendly", "education", "approachable", "colorful"],
    demographics: ["local_community", "educational", "startup"],
    relevanceScore: 87,
    isActive: true,
  },
  {
    id: 7,
    title: "Construction Company Logo",
    description: "Strong, reliable construction company branding",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=400&fit=crop",
    sourceUrl: "https://rebrandgallery.com/construction-logo",
    author: "Industrial Designer",
    source: "rebrand_gallery",
    imageType: "logo",
    styleCategory: "bold",
    tags: ["bold", "construction", "reliable", "strong"],
    demographics: ["south_african", "enterprise", "industrial"],
    relevanceScore: 83,
    isActive: true,
  },
  {
    id: 8,
    title: "Creative Agency Brand Bento",
    description: "Bold, creative agency branding with artistic flair",
    imageUrl:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=400&fit=crop",
    sourceUrl: "https://dribbble.com/shots/creative-agency",
    author: "Creative Collective",
    source: "dribbble",
    imageType: "brand_bento",
    styleCategory: "creative",
    tags: ["creative", "bold", "artistic", "agency"],
    demographics: ["creative_agency", "startup", "local_community"],
    relevanceScore: 91,
    isActive: true,
  },
];

const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  Technology: ["tech", "software", "digital", "innovation", "startup", "saas"],
  Healthcare: ["healthcare", "medical", "health", "wellness", "clinic"],
  Finance: ["finance", "financial", "banking", "investment", "fintech"],
  Education: ["education", "learning", "school", "university", "training"],
  Security: ["security", "protection", "safety", "guard"],
  Construction: ["construction", "building", "contractor", "industrial"],
  "Food & Beverage": ["food", "restaurant", "cafe", "beverage", "culinary"],
  "Professional Services": ["professional", "consulting", "agency", "services"],
};

class MockBrandImagesAPI {
  private delay(ms: number = 800): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async searchCuratedImages(
    request: BrandImageSearchRequest
  ): Promise<BrandImageSearchResponse> {
    await this.delay();

    let filteredImages = [...MOCK_CURATED_IMAGES];

    if (request.industry) {
      const industryKeywords = INDUSTRY_KEYWORDS[request.industry] || [];
      filteredImages = filteredImages.filter((image) => {
        const hasIndustryMatch = industryKeywords.some((keyword) =>
          image.tags.some((tag) =>
            tag.toLowerCase().includes(keyword.toLowerCase())
          )
        );
        return hasIndustryMatch;
      });
    }

    if (request.personality) {
      filteredImages = filteredImages.map((image) => {
        let personalityScore = 0;

        if (request.personality?.formalCasual !== undefined) {
          const formalCasual = request.personality.formalCasual;
          if (formalCasual < 30 && image.tags.includes("professional")) {
            personalityScore += 20;
          } else if (formalCasual > 70 && image.tags.includes("friendly")) {
            personalityScore += 20;
          }
        }

        if (request.personality?.traditionalModern !== undefined) {
          const traditionalModern = request.personality.traditionalModern;
          if (traditionalModern > 70 && image.tags.includes("modern")) {
            personalityScore += 20;
          } else if (
            traditionalModern < 30 &&
            image.tags.includes("traditional")
          ) {
            personalityScore += 20;
          }
        }

        if (request.personality?.seriousPlayful !== undefined) {
          const seriousPlayful = request.personality.seriousPlayful;
          if (
            seriousPlayful > 70 &&
            (image.tags.includes("colorful") || image.tags.includes("creative"))
          ) {
            personalityScore += 20;
          } else if (
            seriousPlayful < 30 &&
            image.tags.includes("professional")
          ) {
            personalityScore += 20;
          }
        }

        return {
          ...image,
          relevanceScore: (image.relevanceScore || 0) + personalityScore,
        };
      });
    }

    filteredImages = filteredImages.map((image) => ({
      ...image,
      relevanceScore:
        (image.relevanceScore || 0) +
        (image.demographics.includes("african") ||
        image.demographics.includes("south_african")
          ? 15
          : 0),
    }));

    filteredImages.sort(
      (a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)
    );

    const limit = request.limit || 16;
    const limitedImages = filteredImages.slice(0, limit);

    return {
      images: limitedImages,
      totalMatches: MOCK_CURATED_IMAGES.length,
      filteredCount: limitedImages.length,
      source: "curated",
    };
  }

  async searchUnsplashImages(
    request: BrandImageSearchRequest
  ): Promise<BrandImageSearchResponse> {
    await this.delay();

    return {
      images: [],
      totalMatches: 0,
      filteredCount: 0,
      source: "unsplash",
    };
  }

  async searchImages(
    request: BrandImageSearchRequest
  ): Promise<BrandImageSearchResponse> {
    try {
      const curatedResults = await this.searchCuratedImages(request);

      if (curatedResults.images.length > 0) {
        return curatedResults;
      }

      return await this.searchUnsplashImages(request);
    } catch (error) {
      console.error("Error searching images:", error);

      return {
        images: [],
        totalMatches: 0,
        filteredCount: 0,
        source: "curated",
      };
    }
  }

  async addManualImage(entry: ManualImageEntry): Promise<BrandImage> {
    await this.delay(500);

    const newImage: BrandImage = {
      id: Date.now(),
      title: entry.title,
      description: entry.description,
      imageUrl: entry.imageUrl,
      sourceUrl: entry.sourceUrl,
      source: entry.source,
      imageType: entry.imageType,
      tags: entry.tags,
      demographics: entry.demographics,
      relevanceScore: 100,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    MOCK_CURATED_IMAGES.push(newImage);

    return newImage;
  }

  async bulkScrapeImages(
    source: string
  ): Promise<{ count: number; message: string }> {
    await this.delay(2000);

    const mockCount = Math.floor(Math.random() * 50) + 10;

    return {
      count: mockCount,
      message: `Successfully scraped ${mockCount} images from ${source}`,
    };
  }
}

export const mockBrandImagesAPI = new MockBrandImagesAPI();
