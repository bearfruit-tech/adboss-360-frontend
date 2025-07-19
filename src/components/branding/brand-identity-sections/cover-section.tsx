
export function CoverSection({ selectedLogo, selectedColors }: { selectedLogo: string | null, selectedColors: string[], onExport?: () => void }) {
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
    
    // Helper to replace fill color in SVG string with the lightest color
    function getLightestLogo(svg: string) {
      return svg.replace(/fill=["']#[0-9a-fA-F]{3,6}["']/g, `fill="${lightestColor}"`)
                .replace(/fill=["']currentColor["']/g, `fill="${lightestColor}"`);
    }
  
    return (
      <section className="mb-12">

        <div 
          className="w-full h-96 rounded-lg shadow-lg flex items-center justify-center"
          style={{ backgroundColor: darkestColor }}
        >
          {selectedLogo ? (
            <div
              className="w-80 h-80 flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: getLightestLogo(selectedLogo) }}
            />
          ) : (
            <div 
              className="w-80 h-80 flex items-center justify-center text-6xl font-bold"
              style={{ color: lightestColor }}
            >
              LOGO
            </div>
          )}
        </div>
      </section>
    );
  }
  