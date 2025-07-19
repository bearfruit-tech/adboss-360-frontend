import useBrandingStore from "@/stores/use-branding-store";

export function TypographySection({ selectedFont }: { selectedFont: string }) {
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
      ? selectedColors.reduce((darkest: string, current: string) => 
          getBrightness(current) < getBrightness(darkest) ? current : darkest
        )
      : "#000000";
    
    const lightestColor = selectedColors.length > 0 
      ? selectedColors.reduce((lightest: string, current: string) => 
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