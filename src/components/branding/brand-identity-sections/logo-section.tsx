export function LogoSection({ selectedLogo, selectedColors }: { selectedLogo: string | null, selectedColors: string[] }) {
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
  
    // Helper to replace fill color in SVG string
    function getColoredLogo(svg: string, color: string) {
      return svg.replace(/fill=["']#[0-9a-fA-F]{3,6}["']/g, `fill="${color}"`)
                .replace(/fill=["']currentColor["']/g, `fill="${color}"`);
    }
  
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
            Logo
          </h2>
          
          {selectedLogo ? (
            <div className="flex justify-center items-center my-8">
              <div
                className="w-56 h-56 flex items-center justify-center border rounded bg-white shadow-lg"
                dangerouslySetInnerHTML={{ __html: selectedLogo }}
              />
            </div>
          ) : (
            <p className="text-gray-400">No logo selected.</p>
          )}
          
          <h4 className="text-lg font-medium mb-2">Color Variations</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {selectedLogo && selectedColors.map(color => (
              <div
                key={color}
                className="aspect-square flex items-center justify-center border rounded bg-white shadow-sm"
                dangerouslySetInnerHTML={{ __html: getColoredLogo(selectedLogo, color) }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  