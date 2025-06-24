 'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useBrandingStore from "@/stores/use-branding-store";
import { apiRequest } from "@/api";
import { HttpMethods } from "@/constants/api_methods";
import { promptClaude } from "@/lib/claude";
import { ColorPaletteClaudeResponse } from "@/types/branding/color-palette-claude-response";
import { LockKeyholeIcon, UnlockKeyholeIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface LockedInColor {
  pallette: string,
  index: number
}

export default function ColorHarmonyStep() {
  const [loading, setLoading] = useState(false);
  const [lockedInColors, setLockedInColors] = useState<LockedInColor[]>([])
  const [huemintPalleteLoading, sethuemintPalleteLoading] = useState<boolean>(false)
  const [previousPalletes, setPreviousPalletes] = useState<string[][]>([])
  const { brandDiscovery, setSelectedColors, selectedColors } = useBrandingStore();

  const lockColor = (index: number, color: string) => {
    console.log("locking", {index, color})
    if(!lockedInColors.includes({index, pallette: color})){
      setLockedInColors([...lockedInColors, {index, pallette: color}])
    }
  }

  const unlockColor = (index: number,color: string) => {
    console.log("unlocking", {index,color})
    const updatedColors = lockedInColors.filter(pall => pall.pallette != color && pall.index != index)
    setLockedInColors([...updatedColors])
  }

  const isPalleteLocked = (color: string, index: number): boolean => {
    return lockedInColors.filter(pallete => pallete.pallette == color && pallete.index == index).length > 0 ? true: false
  }

  const goToPreviousPalette = () => {
    if(previousPalletes.length > 0){
      const updated = previousPalletes.slice(0, previousPalletes.length-1)
      setPreviousPalletes([...updated])
      setSelectedColors(previousPalletes[previousPalletes.length-1])
    }
  }

  useEffect(() => {
    generateClaudeColorPallete();
  }, [])

  const generateClaudeColorPallete = async () => {
    try {
      setLoading(true);
      const result = await promptClaude<ColorPaletteClaudeResponse>(
        "Generate a brand color palette of 5 colors that would work well for this company",
        `
        Return a JSON object with this exact structure:
        {
          "colors": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"],
          "description": "A detailed explanation of why this palette was recommended for the brand"
        }
        `,
        brandDiscovery
      );
      if (result.success) {
        console.log("result:", result.data?.colors);
        if(result.data?.colors){
          setSelectedColors(result.data.colors)
        }
        // console.log("descrip:", result.data?.description);
      }
    } catch (error) {
      toast.error("Failed to load color pallete from claude!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPalettes = async () => {
    try {
      sethuemintPalleteLoading(true);
      const newPallete: string[] = ["-", "-", "-", "-", "-"];
      for (let i = 0; i < lockedInColors.length; i++) {
        if (lockedInColors[i].index == 0) {
          newPallete[0] = lockedInColors[i].pallette;
        }
        if (lockedInColors[i].index == 1) {
          newPallete[1] = lockedInColors[i].pallette;
        }
        if (lockedInColors[i].index == 2) {
          newPallete[2] = lockedInColors[i].pallette;
        }
        if (lockedInColors[i].index == 3) {
          newPallete[3] = lockedInColors[i].pallette;
        }
        if (lockedInColors[i].index == 4) {
          newPallete[4] = lockedInColors[i].pallette;
        }
      }
      console.log("updated pallete", newPallete)
      const response = await apiRequest(HttpMethods.POST, "https://api.huemint.com/color", {
        mode:"transformer", // transformer, diffusion or random
            num_colors:5, // max 12, min 2
            temperature:"1.2", // max 2.4, min 0
            num_results:50, // max 50 for transformer, 5 for diffusion
            adjacency:[ 
              "0",  "65", "45", "35", "60",
              "65", "0",  "35", "65", "50",
              "45", "35", "0",  "35", "55",
              "35", "65", "35", "0",  "40",
              "60", "50", "55", "40", "0"], // nxn adjacency matrix as a flat array of strings
            // palette:["-", "-", "-", "-"]
            palette: newPallete
      });
      /*const response = await fetch("https://api.huemint.com/color", {
        method: 'POST',
        body: JSON.stringify({
            mode:"transformer", // transformer, diffusion or random
            num_colors:4, // max 12, min 2
            temperature:"1.2", // max 2.4, min 0
            num_results:50, // max 50 for transformer, 5 for diffusion
            adjacency:[ "0", "65", "45", "35", "65", "0", "35", "65", "45", "35", "0", "35", "35", "65", "35", "0"], // nxn adjacency matrix as a flat array of strings
            palette:["#ffffff", "-", "-", "-"] // locked colors as hex codes, or '-' if blank
            })
      });*/
      // console.log({response})
      // console.log("response:", response.results[0].palette)
      setPreviousPalletes([...previousPalletes, selectedColors])
      setSelectedColors(response.results[0].palette)
      //const data: ColorHarmonyResponse = await response.json();
    } catch (error) {
      toast.error("Failed to fetch color palettes");
      console.error("Error fetching palettes:", error);
    } finally {
      sethuemintPalleteLoading(false);
    }
  };


  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Color Harmony</h1>
        <p className="mt-1 text-gray-600">Select a color palette that resonates with your brand&apos;s personality and values.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Color Palettes</h2>
            <Button 
              onClick={fetchPalettes} 
              disabled={huemintPalleteLoading || huemintPalleteLoading}
              variant="outline"
            >
              {huemintPalleteLoading ? "Loading..." : "Regenerate Palettes"}
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-1">Choose a color palette that best represents your brand&apos;s visual identity.</p>
        </div>

        <div className="grid grid-cols-5 mb-5">
          {!loading && (
            <>
            {selectedColors.map((pallete, i) => (
              <div className="h-96 flex flex-col justify-end items-center pb-20 rounded-sm" style={{backgroundColor: pallete}} key={i}>
                <div className="flex flex-col items-center">
                  <div className="">
                    {!isPalleteLocked(pallete, i) ?
                    <Button className="cursor-pointer" variant="link" onClick={() => lockColor(i, pallete)}><UnlockKeyholeIcon /></Button>
                    : <Button className="cursor-pointer" variant="link" onClick={() => unlockColor(i,pallete)}><LockKeyholeIcon /></Button>}
                  </div>
                  <p className="text-xl">{pallete}</p>
                </div>
              </div>
            ))}
            </>
          )}

          {loading &&  [1,2,3,4,5].map(arr => (
            <Skeleton className="h-96 w-full border-2" key={arr}/>
          ))}
        </div>

        <div className="">
          <Button disabled={previousPalletes.length == 0} variant="outline" onClick={goToPreviousPalette}>Previous Palette</Button>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>Your selected color palette will be used throughout your brand identity to maintain consistency and visual harmony.</p>
        </div>
      </div>
    </>
  );
}