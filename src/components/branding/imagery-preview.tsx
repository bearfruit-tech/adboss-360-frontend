// src/components/branding/imagery-preview.tsx
'use client'

import useBrandingStore from "@/stores/use-branding-store";

export default function ImageryPreview() {
  const { selectedImagerySet, imagerySampleImages } = useBrandingStore();

  if (!selectedImagerySet) return null;

  // Find the selected imagery set from imagerySampleImages
  const selectedSet = imagerySampleImages.find(set => set.id === selectedImagerySet);
  if (!selectedSet) return null;

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">Imagery Direction</h4>
      <div className="bg-gray-100 rounded-md p-3">
        <p className="text-sm text-gray-600 mb-3">{selectedSet.keyword}</p>
        <div className="grid grid-cols-3 gap-2">
          {selectedSet.images && selectedSet.images.length > 0 ? (
            // Images loaded
            selectedSet.images.map((image) => (
              <div
                key={image.id}
                className="aspect-square rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={image.urls.regular}
                  alt={image.alt_description || selectedSet.keyword}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            // No images state
            <div className="col-span-3 text-center text-gray-400">
              No images available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}