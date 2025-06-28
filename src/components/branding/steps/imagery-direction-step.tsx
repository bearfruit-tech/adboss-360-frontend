// src/components/branding/steps/imagery-direction-step.tsx
'use client'

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useBrandingStore from "@/stores/use-branding-store";
import { ClaudeImageryResponse, ImagerySet } from '@/types/branding/claude-imagery-direction.interface';
import { toast } from 'sonner';
import { promptClaude } from '@/lib/claude';
import { Skeleton } from '@/components/ui/skeleton';


interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
}

interface ImageryDirection {
  id: string,
  keyword: string,
  description: string,
  images: UnsplashImage[]
}

export default function ImageryDirectionStep() {
  const { selectedImagerySet, setSelectedImagerySet, brandDiscovery } = useBrandingStore();
  const [loading, setLoading] = useState(false)
  const [imageLoadingError, setImageLoadingError] = useState<boolean>(false)
  const [unsplashImages, setUnsplashImages] = useState<ImageryDirection[]>([])

    const generateClaudeImageryDirection = async () => {
    try {
      setLoading(true);
      const result = await promptClaude<ClaudeImageryResponse>(
        "Generate 3 keywords that would yield the most accurate and brand-aligned imagery direction for this company, suitable for use in an images API query",
        `
        Each imagerySet item should be an object with the following structure:

        {
          id: The keyword to be used as the ID,
          keyword: The appropriate keyword,
          description: A description of the keyword, not exceeding 20 word
        }

        Return a JSON object with this exact structure:
        {
          "imagerySets": [{}, {}, {}],
        }
        `,
        brandDiscovery
      );
      if (result.success) {
        if(result.data?.imagerySets){
          fetchUsplashImagerySets(result.data.imagerySets)
        }
      }
    } catch (error) {
      toast.error("Failed to load keywords from claude!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsplashImagerySets = async(keywords: ImagerySet[]) => {
    try {
      const result = await Promise.all(keywords.map( async(keyword) => {
        const response =  await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword.keyword)}&per_page=3&client_id=_pe6n0hWqmd718RzzomvHI9A9HFzbPpzAbXWUS4GkE4`)
        const data = await response.json()
        return {
          id: keyword.id,
           keyword: keyword.keyword,
            description: keyword.description, 
            images: data.results
          }

      }))
      setUnsplashImages([...result])
    } catch (error) {
      console.log(error)
      setImageLoadingError(true)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generateClaudeImageryDirection();
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Choose Your Imagery Direction
        </h2>
        <p className="text-gray-600">
          Select a set of images that best represents your brand&apos;s visual
          style and messaging.
        </p>
      </div>

      {loading && (
        <>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="h-80 pl-12 pr-4 pb-5">
                <Skeleton className="h-6 w-5/12" />
                <Skeleton className="h-4 w-10/12" />
                <div className="grid grid-cols-3 gap-3">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton className="h-48 w-full" key={i} />
                    ))}
                </div>
              </Card>
            ))}
        </>
      )}

      {imageLoadingError && (
        <>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="h-80 pl-12 pr-4 pb-5">
                <div className="grid grid-cols-3 gap-3">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center text-gray-400"
                      >
                        Failed to load image
                      </div>
                    ))}
                </div>
              </Card>
            ))}
        </>
      )}

      {(!loading && !imageLoadingError) && 
        <RadioGroup
          value={selectedImagerySet}
          onValueChange={setSelectedImagerySet}
          className="space-y-6"
        >
          {unsplashImages.map((set) => (
            <Card
              key={set.id}
              className={`p-6 cursor-pointer transition-all ${
                selectedImagerySet === set.id
                  ? "border-primary ring-2 ring-primary/20"
                  : "hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <RadioGroupItem value={set.id} id={set.id} />
                <div className="flex-1 space-y-4">
                  <div>
                    <Label
                      htmlFor={set.id}
                      className="text-lg font-medium cursor-pointer"
                    >
                      {set.keyword}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {set.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {set.images.map((image) => (
                      <div
                        key={image.id}
                        className="aspect-square rounded-lg overflow-hidden border border-gray-200"
                      >
                        <img
                          src={image.urls.regular}
                          alt={image.alt_description}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </RadioGroup>
      }
 
    </div>
  );
}