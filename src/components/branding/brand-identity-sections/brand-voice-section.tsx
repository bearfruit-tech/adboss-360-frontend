import useBrandingStore from "@/stores/use-branding-store";

export function BrandVoiceSection({ selectedVoiceSet, selectedColors }: { selectedVoiceSet: string | null, selectedColors: string[] }) {
    const { brandVoices } = useBrandingStore();
    
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
  
    // Find the selected brand voice
    const selectedVoice = selectedVoiceSet ? brandVoices.find(voice => voice.id === selectedVoiceSet) : null;
  
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
            Brand Voice
          </h2>
          
          <div className="space-y-6">
            {selectedVoice ? (
              <div className="bg-white rounded-lg p-6 border shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{selectedVoice.name}</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedVoice.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Hero Text</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-lg font-semibold text-gray-900">{selectedVoice.hero}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Descriptive Text</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-base text-gray-700 leading-relaxed">{selectedVoice.descriptive}</p>
                      </div>
                    </div>
                  </div>
  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Brand Persona</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-900 mb-1">Name & Age</p>
                          <p className="text-gray-700">{selectedVoice.persona.name}, {selectedVoice.persona.age} years old</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 mb-1">Occupation</p>
                          <p className="text-gray-700">{selectedVoice.persona.occupation}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="font-medium text-gray-900 mb-1">Background</p>
                          <p className="text-gray-700">{selectedVoice.persona.background}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 mb-1">Personality</p>
                          <p className="text-gray-700">{selectedVoice.persona.personality}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 mb-1">Communication Style</p>
                          <p className="text-gray-700">{selectedVoice.persona.communicationStyle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 border shadow-sm">
                <p className="text-gray-400 text-center">No brand voice selected.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }