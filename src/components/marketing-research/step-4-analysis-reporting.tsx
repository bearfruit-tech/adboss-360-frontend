'use client'

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useMarketingResearchStore from "@/stores/use-marketing-research-store";
import { promptClaude } from "@/lib/claude";
import type { BrandDiscovery } from "@/types/branding/brand-discovery.interface";

type MarketingReportClaudeResponse = {
  executiveSummary: string;
  objectivesRecap: string;
  methodologySummary: string;
  findingsByMethod: Array<{
    method: string;
    findings: string;
  }>;
  crossMethodAnalysis: string;
  strategicImplications: string;
  actionableRecommendations: string[];
  deliverableDescription: string;
};

export default function Step4AnalysisReporting() {
  const { researchObjectives, researchDesign, dataCollection } = useMarketingResearchStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<MarketingReportClaudeResponse | null>(null);
  const [exporting, setExporting] = useState<boolean>(false);

  const hasPriorSteps = useMemo(() => {
    return (
      !!researchDesign && Object.keys(dataCollection || {}).length > 0
    );
  }, [researchDesign, dataCollection]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGenerateReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const summarizedDataCollection = Object.entries(dataCollection || {}).map(([idx, item]) => ({
        methodIndex: Number(idx),
        findings: item.findings,
        filesCount: (item.files || []).length,
      }));

      const userPrompt = `You are preparing a professional marketing research report for executive stakeholders. Using the Step 1 objectives, Step 2 research design, and Step 3 data collection findings, produce a concise, decision-useful report with the following sections and tone: authoritative, succinct, and business-oriented.`;

      const responseFormat = `Return valid JSON ONLY with this exact structure and keys:\n{\n  "executiveSummary": "string - key findings and strategic recommendations",\n  "objectivesRecap": "string - recap of what needed to be discovered (from Step 1)",\n  "methodologySummary": "string - what approaches were used and why (from Step 2)",\n  "findingsByMethod": [\n    { "method": "string - method name or identifier", "findings": "string - what this method revealed" }\n  ],\n  "crossMethodAnalysis": "string - patterns, contradictions, reinforcing insights across methods",\n  "strategicImplications": "string - what findings mean for business decisions",\n  "actionableRecommendations": ["string - specific next step"],\n  "deliverableDescription": "string - one-line description of the report deliverable"
}`;

      const context = {
        step1Objectives: researchObjectives,
        step2Design: researchDesign,
        step3DataCollection: summarizedDataCollection,
      } as unknown as BrandDiscovery;

      const res = await promptClaude<MarketingReportClaudeResponse>(
        userPrompt,
        responseFormat,
        context,
        { maxTokens: 2000 }
      );

      if (!res.success) {
        throw new Error(res.error || 'Failed to generate report');
      }

      setReport(res.data as MarketingReportClaudeResponse);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Something went wrong while generating report.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPdf = async () => {
    if (!report) return;
    try {
      setExporting(true);
      const res = await fetch('/api/export-marketing-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: researchObjectives?.businessName || 'Research Report',
          report,
        }),
      });
      if (!res.ok) throw new Error('Failed to export PDF');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(researchObjectives?.businessName || 'research-report').replace(/\s+/g, '-').toLowerCase()}-report.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Something went wrong while exporting PDF.';
      setError(message);
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Comprehensive Analysis & Reporting</h1>
          <p className="mt-1 text-gray-600">Analyze collected data and generate comprehensive reports with insights and recommendations.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleGenerateReport} disabled={loading || !hasPriorSteps}>
            {loading ? 'Generating…' : 'Generate Report'}
          </Button>
          <Button onClick={handleExportPdf} disabled={!report || exporting} variant="secondary">
            {exporting ? 'Exporting…' : 'Export PDF'}
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {error && (
          <div className="border border-red-200 bg-red-50 text-red-700 rounded p-4">{error}</div>
        )}

        {!report && !loading && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              Generate a professional research report based on Steps 1–3. Fill prior steps first.
            </p>
          </div>
        )}

        {report && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Executive Summary</CardTitle>
                <CardDescription>Key findings and strategic recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">{report.executiveSummary}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Research Objectives Recap</CardTitle>
                <CardDescription>What needed to be discovered (from Step 1)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 whitespace-pre-line">{report.objectivesRecap}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Methodology Summary</CardTitle>
                <CardDescription>What approaches were used (from Step 2)</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 whitespace-pre-line">{report.methodologySummary}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Findings by Method</CardTitle>
                <CardDescription>What each research method revealed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {report.findingsByMethod?.map((f, i) => (
                    <div key={i} className="p-3 rounded border bg-white">
                      <div className="font-medium text-gray-900">{f.method}</div>
                      <div className="text-gray-800 whitespace-pre-line">{f.findings}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cross-Method Analysis</CardTitle>
                <CardDescription>Patterns, contradictions, and reinforcing insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 whitespace-pre-line">{report.crossMethodAnalysis}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strategic Implications</CardTitle>
                <CardDescription>What the findings mean for business decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 whitespace-pre-line">{report.strategicImplications}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actionable Recommendations</CardTitle>
                <CardDescription>Specific next steps based on insights</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-5 space-y-1">
                  {report.actionableRecommendations?.map((r, i) => (
                    <li key={i} className="text-gray-800">{r}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}