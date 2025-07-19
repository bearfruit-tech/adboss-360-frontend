// app/api/generate-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';
import { 
    generateCoverSectionHTML,
    generateBrandOverviewHTML,
    generateLogoSectionHTML,
    generateColorPaletteSectionHTML,
    generateTypographySectionHTML,
    generateBrandVoiceSectionHTML,
    generateImageryDirectionSectionHTML,
} from '@/lib/utils';
import { BrandDiscovery } from '@/types/branding/brand-discovery.interface';
import { PDFDocument } from 'pdf-lib';
import { BrandVoice } from '@/types/branding/brand-voice-claude-response';
import { ImageryDirection } from '@/stores/use-branding-store';

export async function POST(request: NextRequest) {
  let browser;

  try {
    const body = await request.json();
    const { selectedLogo, selectedColors, brandDiscovery, summary, selectedFont, selectedBrandVoice, selectedImageryDirection }: {
      selectedLogo: string;
      selectedColors: string[];
      brandDiscovery: BrandDiscovery;
      summary: string;
      selectedFont: string;
      selectedBrandVoice: BrandVoice;
      selectedImageryDirection: ImageryDirection
    } = body;

    // Validate required fields for all pages
    if (!selectedLogo || !selectedColors || !Array.isArray(selectedColors) || !brandDiscovery || !summary || !selectedFont) {
      return NextResponse.json(
        { error: 'selectedLogo (string), selectedColors (array of strings), brandDiscovery (object), summary (string), and selectedFont (string) are required' },
        { status: 400 }
      );
    }

    browser = await chromium.launch({
      headless: true,
    });

    // Render coverHtml to PDF buffer
    const coverHtml = generateCoverSectionHTML(selectedLogo, selectedColors).html;
    const coverPage = await browser.newPage();
    await coverPage.setContent(coverHtml, { waitUntil: 'networkidle' });
    const coverPdfBuffer = await coverPage.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    await coverPage.close();

    // Render overviewHtml to PDF buffer
    const overviewHtml = generateBrandOverviewHTML(brandDiscovery, selectedColors, summary).html;
    const overviewPage = await browser.newPage();
    await overviewPage.setContent(overviewHtml, { waitUntil: 'networkidle' });
    const overviewPdfBuffer = await overviewPage.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    await overviewPage.close();

    // Render logoSectionHtml to PDF buffer
    const logoSectionHtml = generateLogoSectionHTML(selectedLogo, selectedColors).html;
    const logoSectionPage = await browser.newPage();
    await logoSectionPage.setContent(logoSectionHtml, { waitUntil: 'networkidle' });
    const logoSectionPdfBuffer = await logoSectionPage.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    await logoSectionPage.close();

    // Render colorPaletteSectionHtml to PDF buffer
    const colorPaletteSectionHtml = generateColorPaletteSectionHTML(selectedColors).html;
    const colorPaletteSectionPage = await browser.newPage();
    await colorPaletteSectionPage.setContent(colorPaletteSectionHtml, { waitUntil: 'networkidle' });
    const colorPaletteSectionPdfBuffer = await colorPaletteSectionPage.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    await colorPaletteSectionPage.close();

    // Render typographySectionHtml to PDF buffer
    const typographySectionHtml = generateTypographySectionHTML(selectedFont, selectedColors).html;
    const typographySectionPage = await browser.newPage();
    await typographySectionPage.setContent(typographySectionHtml, { waitUntil: 'networkidle' });
    const typographySectionPdfBuffer = await typographySectionPage.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    await typographySectionPage.close();

    // Render imageryDirectionSectionHtml to PDF buffer
    const imageryDirectionSectionHtml = generateImageryDirectionSectionHTML(selectedImageryDirection, selectedColors).html;
    const imageryDirectionSectionPage = await browser.newPage();
    await imageryDirectionSectionPage.setContent(imageryDirectionSectionHtml, { waitUntil: 'networkidle' });
    const imageryDirectionSectionPdfBuffer = await imageryDirectionSectionPage.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    await imageryDirectionSectionPage.close();

    // Render brandVoiceSectionHtml to PDF buffer
    const brandVoiceSectionHtml = generateBrandVoiceSectionHTML(selectedBrandVoice, selectedColors).html;
    const brandVoiceSectionPage = await browser.newPage();
    await brandVoiceSectionPage.setContent(brandVoiceSectionHtml, { waitUntil: 'networkidle' });
    const brandVoiceSectionPdfBuffer = await brandVoiceSectionPage.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });
    await brandVoiceSectionPage.close();

    await browser.close();

    // Merge PDFs using pdf-lib
    const mergedPdf = await PDFDocument.create();

    // Add cover page
    const coverDoc = await PDFDocument.load(coverPdfBuffer);
    const [coverPageCopied] = await mergedPdf.copyPages(coverDoc, [0]);
    mergedPdf.addPage(coverPageCopied);

    // Add overview page
    const overviewDoc = await PDFDocument.load(overviewPdfBuffer);
    const [overviewPageCopied] = await mergedPdf.copyPages(overviewDoc, [0]);
    mergedPdf.addPage(overviewPageCopied);

    // Add logo section page
    const logoSectionDoc = await PDFDocument.load(logoSectionPdfBuffer);
    const [logoSectionPageCopied] = await mergedPdf.copyPages(logoSectionDoc, [0]);
    mergedPdf.addPage(logoSectionPageCopied);

    // Add color palette section page
    const colorPaletteSectionDoc = await PDFDocument.load(colorPaletteSectionPdfBuffer);
    const [colorPaletteSectionPageCopied] = await mergedPdf.copyPages(colorPaletteSectionDoc, [0]);
    mergedPdf.addPage(colorPaletteSectionPageCopied);

    // Add typography section page
    const typographySectionDoc = await PDFDocument.load(typographySectionPdfBuffer);
    const [typographySectionPageCopied] = await mergedPdf.copyPages(typographySectionDoc, [0]);
    mergedPdf.addPage(typographySectionPageCopied);

    // Add imagery direction section page
    const imageryDirectionSectionDoc = await PDFDocument.load(imageryDirectionSectionPdfBuffer);
    const [imageryDirectionSectionPageCopied] = await mergedPdf.copyPages(imageryDirectionSectionDoc, [0]);
    mergedPdf.addPage(imageryDirectionSectionPageCopied);

    // Add brand voice section page
    const brandVoiceSectionDoc = await PDFDocument.load(brandVoiceSectionPdfBuffer);
    const [brandVoiceSectionPageCopied] = await mergedPdf.copyPages(brandVoiceSectionDoc, [0]);
    mergedPdf.addPage(brandVoiceSectionPageCopied);

    const mergedPdfBytes = await mergedPdf.save();

    return new NextResponse(Buffer.from(mergedPdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="brand-identity-suite.pdf"'
      }
    });

  } catch (error) {
    console.error('PDF generation error:', error);

    if (browser) {
      await browser.close();
    }

    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
