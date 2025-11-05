import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';
import { generateMarketingResearchReportHTML } from '@/lib/utils';

export async function POST(request: NextRequest) {
  let browser;
  try {
    const body = await request.json();
    const { businessName, report } = body as {
      businessName: string;
      report: {
        executiveSummary: string;
        objectivesRecap: string;
        methodologySummary: string;
        findingsByMethod: Array<{ method: string; findings: string }>;
        crossMethodAnalysis: string;
        strategicImplications: string;
        actionableRecommendations: string[];
        deliverableDescription: string;
      };
    };

    if (!report) {
      return NextResponse.json({ error: 'Missing report payload' }, { status: 400 });
    }

    const { html } = generateMarketingResearchReportHTML(businessName || 'Research Report', report);

    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '12mm', right: '12mm', bottom: '14mm', left: '12mm' },
    });
    await page.close();
    await browser.close();

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="marketing-research-report.pdf"',
      },
    });
  } catch {
    if (browser) {
      await browser.close();
    }
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}


