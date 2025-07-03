'use client'

import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useBrandingStore from "@/stores/use-branding-store";
import { useEffect, useState } from "react";
import { promptClaude } from "@/lib/claude";
import { BrandVoiceClaudeResponse } from "@/types/branding/brand-voice-claude-response";
import { Skeleton } from "@/components/ui/skeleton";

export default function BrandVoiceStep() {
  const { selectedVoiceSet, setSelectedVoiceSet, brandDiscovery, brandVoices, setBrandVoices } = useBrandingStore();
  const [loading, setLoading] = useState<boolean>(false);

    const fetchClaudeVoiceBrandSuggestions = async () => {
      try {
        setLoading(true)
        const response = await promptClaude<BrandVoiceClaudeResponse>(
          "Please suggest 3 brand voice styles that best represent how this brand should communicate with its audience.",
          ` 
          Each brandVoice item should be an object with the following structure:
          
          {
            id: name of the voice style as an identifier,
            name: name of the voice style,
            description: a brief description of the voice style,
            hero: a short hero text about the voice (max 6 words),
            descriptive: a detailed description of the voice,
            persona: {
              name: name of the person representing the voice,
              age: age of the person,
              occupation: occupation of the person,
              background: background information about the person,
              personality: personality traits of the person,
              communicationStyle: how the person typically communicates
            }
          }
  
          Return a JSON object with this exact structure:
  
          {
            "brandVoices": [ {}, {}, {} ],
            "description": "Include a detailed explanation of why these brand voices were recommended for this brand"
          }
        `,
          brandDiscovery
        );
        if (response.success) {
          // console.log(response.data?.brandVoices);
          if (response.data?.brandVoices) {
            setBrandVoices(response.data.brandVoices)
          }
        }
      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false)
      }
    };

    useEffect(() => {
      fetchClaudeVoiceBrandSuggestions();
    }, [])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Choose Your Brand Voice</h2>
        <p className="text-gray-600">
          Select a voice that best represents how your brand communicates with your audience.
        </p>
      </div>

      {loading && (
        <>
          {[1,2,3].map((skell, i) => (
            <Card className="h-72" key={i}>
              <Skeleton className="ml-14 w-40 h-5"/>
              <Skeleton className="ml-14 w-60 h-5"/>
              <div className="ml-8">
                <Skeleton className="ml-5 w-10/12 h-8 mb-4"/>
                <Skeleton className="ml-5 w-9/12 h-6 mb-4"/>
                <Skeleton className="ml-5 w-9/12 h-6 mb-4"/>
              </div>
            </Card>
          ))}
        </>
      )}

      {!loading && (
        <RadioGroup
          value={selectedVoiceSet}
          onValueChange={setSelectedVoiceSet}
          className="space-y-6"
        >
          {brandVoices.map((set) => (
            <Card
              key={set.id}
              className={`p-6 cursor-pointer transition-all ${
                selectedVoiceSet === set.id
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
                      {set.name}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">{set.description}</p>
                  </div>
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Hero Text</h4>
                      <p className="text-lg font-semibold">{set.hero}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Descriptive Text</h4>
                      <p className="text-base text-gray-600">{set.descriptive}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Brand Persona</h4>
                      <div className="text-xs text-gray-700 space-y-1">
                        <p><span className="font-medium">Name:</span> {set.persona.name}, age {set.persona.age}, {set.persona.occupation}</p>
                        <p><span className="font-medium">Background:</span> {set.persona.background}</p>
                        <p><span className="font-medium">Personality:</span> {set.persona.personality}</p>
                        <p><span className="font-medium">Communication Style:</span> {set.persona.communicationStyle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </RadioGroup>
      )}

    </div>
  );
}