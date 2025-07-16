"use client";
import { useState, useEffect } from "react";
import useBrandingStore from "@/stores/use-branding-store";
import { mockBrandImagesAPI } from "@/lib/brand-images/mock-api";
import { BrandImage, BrandImageSearchRequest } from "@/types/brand-images";

export default function VisualInspirationStep() {
  const { selectedImages, toggleImageSelection, brandDiscovery } =
    useBrandingStore();

  const [inspirationImages, setInspirationImages] = useState<BrandImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageSource, setImageSource] = useState<"curated" | "unsplash">(
    "curated"
  );

  const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    fetchInspirationImages();
  }, []);

  const fetchCuratedImages = async (): Promise<BrandImage[]> => {
    const searchRequest: BrandImageSearchRequest = {
      industry: brandDiscovery.industry,
      personality: brandDiscovery.personality,
      values: brandDiscovery.values,
      visualPreferences: brandDiscovery.visualPreferences,
      limit: 16,
    };

    const response = await mockBrandImagesAPI.searchImages(searchRequest);
    return response.images;
  };

  const fetchUnsplashImages = async (): Promise<BrandImage[]> => {
    if (!UNSPLASH_ACCESS_KEY) {
      throw new Error("Unsplash access key not found.");
    }

    const searchTerms = [];

    if (brandDiscovery.industry) {
      searchTerms.push(`${brandDiscovery.industry} design`);
      searchTerms.push(`${brandDiscovery.industry} branding`);
    }

    if (brandDiscovery.values && brandDiscovery.values.length > 0) {
      const valueTermsMap: Record<string, string> = {
        innovation: "innovative design",
        sustainability: "sustainable design",
        quality: "premium quality",
        trust: "trustworthy brand",
        creativity: "creative design",
        reliability: "reliable professional",
        excellence: "excellent design",
        integrity: "authentic brand",
        community: "community focused",
        growth: "growth oriented",
        efficiency: "efficient design",
        transparency: "transparent brand",
      };
      brandDiscovery.values.forEach((valueId: string | number) => {
        const searchTerm = valueTermsMap[valueId];
        if (searchTerm) {
          searchTerms.push(searchTerm);
        }
      });
    }

    if (
      brandDiscovery.targetAudience &&
      Array.isArray(brandDiscovery.targetAudience) &&
      brandDiscovery.targetAudience.length > 0
    ) {
      const primaryAudience = brandDiscovery.targetAudience[0];
      if (
        primaryAudience.income === "luxury" ||
        primaryAudience.income === "affluent"
      ) {
        searchTerms.push("luxury design", "premium branding", "elegant design");
      } else if (primaryAudience.income === "budget") {
        searchTerms.push(
          "accessible design",
          "simple branding",
          "clean design"
        );
      }
      if (
        primaryAudience.education === "phd" ||
        primaryAudience.education === "masters"
      ) {
        searchTerms.push("professional design", "sophisticated branding");
      }
    }

    if (brandDiscovery.personality) {
      const { formalCasual, traditionalModern, seriousPlayful } =
        brandDiscovery.personality;
      if (formalCasual > 70) {
        searchTerms.push("casual design", "friendly branding");
      } else if (formalCasual < 30) {
        searchTerms.push("formal design", "corporate branding");
      }
      if (traditionalModern > 70) {
        searchTerms.push("modern design", "contemporary branding");
      } else if (traditionalModern < 30) {
        searchTerms.push("traditional design", "classic branding");
      }
      if (seriousPlayful > 70) {
        searchTerms.push("playful design", "fun branding");
      } else if (seriousPlayful < 30) {
        searchTerms.push("serious design", "professional branding");
      }
    }

    if (searchTerms.length === 0) {
      searchTerms.push(
        "minimal design",
        "branding",
        "modern design",
        "creative",
        "aesthetic"
      );
    }

    const randomTerm =
      searchTerms[Math.floor(Math.random() * searchTerms.length)];
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${randomTerm}&per_page=16&orientation=squarish`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data: { results: UnsplashPhoto[] } = await response.json();

    type UnsplashPhoto = {
      id: string;
      alt_description: string | null;
      urls: { regular: string };
      user: { name: string };
      links: { html: string };
    };

    return data.results.map((photo: UnsplashPhoto) => ({
      id: photo.id,
      title: photo.alt_description || "Design Inspiration",
      imageUrl: photo.urls.regular,
      author: photo.user.name,
      sourceUrl: photo.links.html,
      source: "Unsplash",
      imageType: "identity" as const,
      tags: [],
      demographics: [],
    }));
  };

  const fetchInspirationImages = async () => {
    try {
      setLoading(true);
      setError(null);

      if (imageSource === "curated") {
        try {
          const images = await fetchCuratedImages();
          if (images && images.length > 0) {
            setInspirationImages(images);
            return;
          }
        } catch (curatedError) {
          console.warn(
            "Curated images failed, falling back to Unsplash:",
            curatedError
          );
        }
      }

      const images = await fetchUnsplashImages();
      setInspirationImages(images);
    } catch (err) {
      console.error("Error fetching inspiration images:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching images"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelection = (imageId: number) => {
    toggleImageSelection(imageId);
  };

  const handleRefresh = () => {
    fetchInspirationImages();
  };

  const handleSourceToggle = () => {
    const newSource = imageSource === "curated" ? "unsplash" : "curated";
    setImageSource(newSource);
    // Fetch images with new source
    setLoading(true);
    if (newSource === "curated") {
      fetchCuratedImages()
        .then((images) => {
          setInspirationImages(images);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching curated images:", err);
          setLoading(false);
        });
    } else {
      fetchUnsplashImages()
        .then((images) => {
          setInspirationImages(images);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching Unsplash images:", err);
          setLoading(false);
        });
    }
  };

  if (loading) {
    return (
      <>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Visual Inspiration
          </h1>
          <p className="mt-1 text-gray-600">
            Select images that align with your brand&apos;s visual style and
            feeling.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-600">
              Loading inspiring designs...
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Visual Inspiration</h1>
        <p className="mt-1 text-gray-600">
          Select images that align with your brand&apos;s visual style and
          feeling.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium text-gray-900">Mood Board</h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {selectedImages.length} selected
              </div>
              <button
                onClick={handleSourceToggle}
                className="text-sm text-primary hover:text-primary-dark font-medium px-3 py-1 rounded-md border border-primary"
                title={`Switch to ${
                  imageSource === "curated" ? "Unsplash" : "Curated"
                } images`}
              >
                {imageSource === "curated" ? "Try Unsplash" : "Try Curated"}
              </button>
              <button
                onClick={handleRefresh}
                className="text-sm text-primary hover:text-primary-dark font-medium"
                title="Refresh images"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Choose 3-5 images that best represent your brand&apos;s visual
            direction.
            <span className="text-xs text-gray-500 ml-1">
              {imageSource === "curated"
                ? "Curated Brand Collection"
                : "Powered by Unsplash"}
            </span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {inspirationImages.map((img) => (
            <div
              key={img.id}
              className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 ${
                selectedImages.includes(img.id as any)
                  ? "border-gradient-gold shadow-md"
                  : "border-transparent hover:border-gray-300"
              }`}
              onClick={() => handleImageSelection(img.id)}
              title={`${img.title} by ${img.author}`}
            >
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-full object-cover aspect-square"
                loading="lazy"
              />
              {selectedImages.includes(img.id as any) && (
                <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                <p className="text-white text-xs truncate">{img.title}</p>
                {img.imageType && imageSource === "curated" && (
                  <p className="text-white text-xs opacity-75 truncate">
                    {img.imageType.replace("_", " ")}
                    {img.relevanceScore && ` • ${img.relevanceScore}/100`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>
            These selections will influence your brand&apos;s visual style,
            color palette, and overall aesthetic direction.
            {imageSource === "curated" && brandDiscovery.industry && (
              <span className="block mt-1 text-xs text-gray-500">
                Images are matched based on your industry (
                {brandDiscovery.industry}) and personality traits.
              </span>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
