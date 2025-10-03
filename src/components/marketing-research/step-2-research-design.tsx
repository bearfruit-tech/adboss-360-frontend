'use client'

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useMarketingResearchStore, { ResearchDesignClaudeResponse } from "@/stores/use-marketing-research-store";
import { promptClaude } from "@/lib/claude";
import type { BrandDiscovery } from "@/types/branding/brand-discovery.interface";

// Types moved to store for cross-step sharing

export default function Step2ResearchDesign() {
  const { researchObjectives, setResearchDesign } = useMarketingResearchStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResearchDesignClaudeResponse | null>(null);

  const isObjectivesFilled = useMemo(() => {
    // Consider a few key fields to decide whether to call Claude
    return (
      (researchObjectives?.businessName?.trim()?.length ?? 0) > 0 ||
      (researchObjectives?.primaryGoal?.trim()?.length ?? 0) > 0 ||
      (researchObjectives?.businessDecisions?.trim()?.length ?? 0) > 0
    );
  }, [researchObjectives]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!isObjectivesFilled) return;
      setLoading(true);
      setError(null);
      try {
        const userPrompt = `Create a concise introduction for the Research Design & Methodology section based on the provided research objectives, and propose up to five suitable methodologies that fit the goals, audiences, constraints, and context. For each methodology, include:\n- A brief description of when/why to use it.\n- An Execution Blueprint as a step-by-step how-to list.\n- Resource Specifications with sample sizes, participant criteria, and a realistic timeline.\n- A list of specific questions/prompts/artifacts to be used during execution.`;

        const responseFormat = `Return valid JSON ONLY with this exact structure and keys:\n{\n  "introduction": "string - a brief paragraph introducing the overall research design approach",\n  "methodologies": [\n    {\n      "name": "string - name of the methodology (e.g., Focus Groups)",\n      "description": "string - when and why to use this method in this context",\n      "executionBlueprint": ["string step 1", "string step 2", "string step 3"],\n      "resourceSpecifications": {\n        "sampleSize": "string - numbers per segment/cohort as applicable",\n        "participantCriteria": "string - who should be included/excluded",\n        "timeline": "string - estimated duration and phases"\n      },\n      "questions": ["string question 1", "string question 2", "string question 3"]\n    }\n  ]\n}`;

        const res = await promptClaude<ResearchDesignClaudeResponse>(
          userPrompt,
          responseFormat,
          // We reuse the promptClaude context parameter by passing step 1 data.
          // Casting to any to satisfy the existing type signature.
          researchObjectives as unknown as BrandDiscovery,
          { maxTokens: 2000 }
        );

        if (!res.success) {
          throw new Error(res.error || 'Failed to generate research design');
        }

        // Cap methodologies to at most 5
        const capped: ResearchDesignClaudeResponse = {
          introduction: res.data?.introduction ?? '',
          methodologies: (res.data?.methodologies || []).slice(0, 5),
        };

        setResult(capped);
        setResearchDesign(capped);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Something went wrong while generating research design.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [isObjectivesFilled, researchObjectives, setResearchDesign]);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Research Design & Methodology</h1>
        <p className="mt-1 text-gray-600">Design your research methodology and select the appropriate research techniques.</p>
      </div>

      <div className="space-y-8">
        {loading && (
          <div className="space-y-4">
            <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4" />
            <div className="animate-pulse h-4 bg-gray-200 rounded w-2/3" />
            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2" />
          </div>
        )}

        {error && (
          <div className="border border-red-200 bg-red-50 text-red-700 rounded p-4">
            {error}
          </div>
        )}

        {!loading && !error && result?.introduction && (
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
              <CardDescription>A concise overview of the recommended research design</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-800 leading-relaxed">{result.introduction}</p>
            </CardContent>
          </Card>
        )}

        {!loading && !error && (result?.methodologies?.length ?? 0) > 0 && (
          <div className="space-y-6">
            {result!.methodologies.map((m, idx) => (
              <Card key={`${m.name}-${idx}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{m.name}</CardTitle>
                      <CardDescription>{m.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Methodology</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Execution Blueprint</h3>
                    <ol className="list-decimal ml-5 space-y-1">
                      {m.executionBlueprint?.map((step, i) => (
                        <li key={i} className="text-gray-800">{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Resource Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 rounded border bg-gray-50">
                        <div className="text-xs uppercase text-gray-500">Sample Size</div>
                        <div className="text-gray-900">{m.resourceSpecifications?.sampleSize}</div>
                      </div>
                      <div className="p-3 rounded border bg-gray-50">
                        <div className="text-xs uppercase text-gray-500">Participant Criteria</div>
                        <div className="text-gray-900">{m.resourceSpecifications?.participantCriteria}</div>
                      </div>
                      <div className="p-3 rounded border bg-gray-50">
                        <div className="text-xs uppercase text-gray-500">Timeline</div>
                        <div className="text-gray-900">{m.resourceSpecifications?.timeline}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Specific Questions / Artefacts</h3>
                    <ul className="list-disc ml-5 space-y-1">
                      {m.questions?.map((q, i) => (
                        <li key={i} className="text-gray-800">{q}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && !error && !result && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              Fill out key details in Step 1 to generate a recommended research design here.
            </p>
          </div>
        )}
      </div>
    </>
  );
}