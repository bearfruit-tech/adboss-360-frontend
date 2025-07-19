import type { ImageryDirection, UnsplashImage } from "@/stores/use-branding-store";

export function ImageryDirectionSection({ selectedImageryDirection, selectedColors }: { selectedImageryDirection: ImageryDirection | null, selectedColors: string[] }) {
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
            Imagery Direction
          </h2>
          
          <div className="space-y-6">
            {selectedImageryDirection ? (
              <div className="bg-white rounded-lg p-6 border shadow-sm">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{selectedImageryDirection.keyword}</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedImageryDirection.description}</p>
                  </div>
                  
                  {/* No explicit keywords array in ImageryDirection, so skip Key Characteristics if not present */}
                  {/*selectedImageryDirection.keywords && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Key Characteristics</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedImageryDirection.keywords.map((keyword: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )*/}
  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Visual Style Preview</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedImageryDirection.images && selectedImageryDirection.images.length > 0 ? (
                        selectedImageryDirection.images.map((image: UnsplashImage, index: number) => (
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
                        ))
                      ) : (
                        // Fallback to placeholder images if no images found
                        [1, 2, 3, 4].map((i: number) => (
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