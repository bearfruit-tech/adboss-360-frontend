export function ColorPaletteSection({ selectedColors }: { selectedColors: string[] }) {
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
            Color Palette
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
            {selectedColors.map((color) => (
              <div key={color} className="flex flex-col items-center">
                <div
                  className="w-full h-48 rounded-lg shadow-md border border-gray-200 mb-2"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm font-mono text-gray-600">{color}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }