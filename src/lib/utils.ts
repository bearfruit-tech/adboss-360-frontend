import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BrandDiscovery } from '@/types/branding/brand-discovery.interface';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stringToSlug(str: string) {
  return str.toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function generateCoverSectionHTML(selectedLogo: string, selectedColors: string[]): { html: string, darkestColor: string, lightestColor: string } {
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
    return svg
      ? svg.replace(/fill=["']#[0-9a-fA-F]{3,6}["']/g, `fill=\"${lightestColor}\"`)
            .replace(/fill=["']currentColor["']/g, `fill=\"${lightestColor}\"`)
      : '';
  }

  // CSS to match the CoverSection layout, sized for landscape A4 PDF
  const componentStyles = `
    html, body {
      height: 210mm;
      width: 297mm;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Arial', sans-serif;
      width: 297mm;
      height: 210mm;
      min-width: 297mm;
      min-height: 210mm;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    body::before {
      content: '';
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      width: 297mm;
      height: 210mm;
      background: ${darkestColor};
      z-index: -1;
    }
    .cover-section-outer {
      width: 260mm;
      height: 150mm;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8mm;
      box-shadow: 0 4mm 16mm 0 rgba(0,0,0,0.10), 0 1mm 2mm 0 rgba(0,0,0,0.05);
      /* No background here, only the logo container */
    }
    .logo-svg-container, .logo-placeholder {
       width: 297mm;
        height: 210mm;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4mm;
      background: transparent;
    }
    .logo-placeholder {
      font-size: 32mm;
      font-weight: bold;
      color: ${lightestColor};
    }
    svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    @media print {
      html, body {
        width: 297mm;
        height: 210mm;
      }
      .cover-section-outer {
         width: 297mm;
        height: 210mm;
      }
    }
  `;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset=\"UTF-8\">
        <title>Cover Section PDF</title>
        <style>${componentStyles}</style>
      </head>
      <body>
        <div class=\"cover-section-outer\">
          ${selectedLogo ? `
            <div class=\"logo-svg-container\">${getLightestLogo(selectedLogo)}</div>
          ` : `
            <div class=\"logo-placeholder\">LOGO</div>
          `}
        </div>
      </body>
    </html>
  `;

  return { html, darkestColor, lightestColor };
}

export function generateBrandOverviewHTML(
  brandDiscovery: BrandDiscovery,
  selectedColors: string[],
  summary: string
): { html: string, darkestColor: string, lightestColor: string } {
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

  // CSS for the BrandOverviewSection
  const componentStyles = `
    html, body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Arial', sans-serif;
      background: #f8fafc;
      width: 100vw;
      height: 100vh;
      min-height: 100vh;
      min-width: 100vw;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
    .brand-overview-section {
      margin-bottom: 3rem;
      width: 100vw;
      max-width: 900px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .brand-overview-card {
      position: relative;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
      padding: 2rem 1.5rem;
      min-height: 100px;
      height: 210mm;
      background: linear-gradient(135deg, ${lightestColor}20 0%, ${darkestColor}10 100%);
      width: 100%;
      box-sizing: border-box;
    }
    .brand-overview-accent {
      position: absolute;
      left: 0;
      top: 1.5rem;
      height: 3rem;
      width: 0.5rem;
      border-radius: 0 0.5rem 0.5rem 0;
      background: ${darkestColor};
    }
    .brand-overview-title {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      margin-left: 1rem;
      color: ${darkestColor};
      margin-top: 0;
    }
    .brand-overview-details {
      margin-bottom: 1.5rem;
      margin-left: 1rem;
    }
    .brand-overview-detail-label {
      font-weight: 600;
    }
    .brand-overview-detail {
      margin-bottom: 0.5rem;
    }
    .brand-overview-summary {
      color: #374151;
      white-space: pre-line;
      margin-left: 1rem;
      margin-top: 0;
    }
    @media print {
      html, body {
        width: 297mm;
        height: 210mm;
      }
      .brand-overview-section {
        width: 297mm;
        max-width: 297mm;
      }
      .brand-overview-card {
        width: 100%;
      }
    }
  `;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset=\"UTF-8\">
        <title>Brand Overview PDF</title>
        <style>${componentStyles}</style>
      </head>
      <body style=\"margin:0;padding:0;\">
        <section class=\"brand-overview-section\">
          <div class=\"brand-overview-card\">
            <div class=\"brand-overview-accent\"></div>
            <h2 class=\"brand-overview-title\">Brand Overview</h2>
            <div class=\"brand-overview-details\">
              ${brandDiscovery.businessName ? `<div class=\"brand-overview-detail\"><span class=\"brand-overview-detail-label\">Business Name: </span><span>${brandDiscovery.businessName}</span></div>` : ''}
              ${brandDiscovery.businessDescription ? `<div class=\"brand-overview-detail\"><span class=\"brand-overview-detail-label\">Business Description: </span><span>${brandDiscovery.businessDescription}</span></div>` : ''}
              ${brandDiscovery.industry ? `<div class=\"brand-overview-detail\"><span class=\"brand-overview-detail-label\">Industry: </span><span>${brandDiscovery.industry}</span></div>` : ''}
            </div>
            <p class=\"brand-overview-summary\">${summary}</p>
          </div>
        </section>
      </body>
    </html>
  `;

  return { html, darkestColor, lightestColor };
}

export function generateLogoSectionHTML(
  selectedLogo: string | null,
  selectedColors: string[]
): { html: string, darkestColor: string, lightestColor: string } {
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
    return svg.replace(/fill=["']#[0-9a-fA-F]{3,6}["']/g, `fill=\"${color}\"`)
              .replace(/fill=["']currentColor["']/g, `fill=\"${color}\"`);
  }

  // CSS for the LogoSection
  const componentStyles = `
    html, body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Arial', sans-serif;
      background: #f8fafc;
      width: 100vw;
      height: 100vh;
      min-height: 100vh;
      min-width: 100vw;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
    .logo-section {
      margin-bottom: 3rem;
      width: 100vw;
      height: 100%;
      max-width: 900px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .logo-card {
      position: relative;
      //border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 2rem 1.5rem;
      min-height: 100px;
      width: 100%;
      box-sizing: border-box;
    }
    .logo-accent {
      position: absolute;
      left: 0;
      top: 1.5rem;
      height: 3rem;
      width: 0.5rem;
      border-radius: 0 0.5rem 0.5rem 0;
      background: ${darkestColor};
    }
    .logo-title {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      margin-left: 1rem;
      color: ${darkestColor};
      margin-top: 0;
    }
    .logo-main {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 2rem 0;
    }
    .logo-main-inner {
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: #fff;
    }
    .logo-main-inner svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    .logo-no {
      color: #9ca3af;
      text-align: center;
    }
    .logo-variations-title {
      font-size: 1.125rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    .logo-variations-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      width: 100%;
    }
    @media (min-width: 768px) {
      .logo-variations-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    @media (min-width: 1024px) {
      .logo-variations-grid {
        grid-template-columns: repeat(5, 1fr);
      }
    }
    .logo-variation {
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: #fff;
    }
    .logo-variation svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
    @media print {
      html, body {
        width: 297mm;
        height: 210mm;
      }
      .logo-section {
        width: 297mm;
        max-width: 297mm;
      }
      .logo-card {
        width: 100%;
      }
    }
  `;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset=\"UTF-8\">
        <title>Logo Section PDF</title>
        <style>${componentStyles}</style>
      </head>
      <body style=\"margin:0;padding:0;\">
        <section class=\"logo-section\">
          <div class=\"logo-card\">
            <div class=\"logo-accent\"></div>
            <h2 class=\"logo-title\">Logo</h2>
            ${selectedLogo ? `
              <div class=\"logo-main\">
                <div class=\"logo-main-inner\">${selectedLogo}</div>
              </div>
            ` : `
              <p class=\"logo-no\">No logo selected.</p>
            `}
            <h4 class=\"logo-variations-title\">Color Variations</h4>
            <div class=\"logo-variations-grid\">
              ${selectedLogo && selectedColors.length > 0 ? selectedColors.map(color => `
                <div class=\"logo-variation\">${getColoredLogo(selectedLogo, color)}</div>
              `).join('') : ''}
            </div>
          </div>
        </section>
      </body>
    </html>
  `;

  return { html, darkestColor, lightestColor };
}

export function generateColorPaletteSectionHTML(
  selectedColors: string[]
): { html: string, darkestColor: string, lightestColor: string } {
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

  // CSS for the ColorPaletteSection
  const componentStyles = `
    html, body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Arial', sans-serif;
      background: #f8fafc;
      width: 100vw;
      height: 100vh;
      min-height: 100vh;
      min-width: 100vw;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
    .color-palette-section {
      margin-bottom: 3rem;
      width: 100vw;
      max-width: 900px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .color-palette-card {
      position: relative;
      margin-top: 30px
      border-radius: 0.5rem;
      padding: 2rem 1.5rem;
      min-height: 100px;
      width: 100%;
      box-sizing: border-box;
    }
    .color-palette-accent {
      position: absolute;
      left: 0;
      top: 1.5rem;
      height: 3rem;
      width: 0.5rem;
      border-radius: 0 0.5rem 0.5rem 0;
      background: ${darkestColor};
    }
    .color-palette-title {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      margin-left: 1rem;
      color: ${darkestColor};
      margin-top: 0;
    }
    .color-palette-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 1rem;
      width: 100%;
    }
    @media (min-width: 768px) {
      .color-palette-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1024px) {
      .color-palette-grid {
        grid-template-columns: repeat(5, 1fr);
      }
    }
    .color-palette-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .color-palette-swatch {
      width: 100%;
      height: 600px;
      border-radius: 0.5rem;
      //box-shadow: 0 2px 8px 0 rgba(0,0,0,0.08);
      border: 1px solid #e5e7eb;
      margin-bottom: 0.5rem;
    }
    .color-palette-label {
      font-size: 0.95rem;
      font-family: monospace;
      color: #4b5563;
    }
    @media print {
      html, body {
        width: 297mm;
        height: 210mm;
      }
      .color-palette-section {
        width: 297mm;
        max-width: 297mm;
      }
      .color-palette-card {
        width: 100%;
      }
    }
  `;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset=\"UTF-8\">
        <title>Color Palette Section PDF</title>
        <style>${componentStyles}</style>
      </head>
      <body style=\"margin:0;padding:0;\">
        <section class=\"color-palette-section\">
          <div class=\"color-palette-card\">
            <div class=\"color-palette-accent\"></div>
            <h2 class=\"color-palette-title\">Color Palette</h2>
            <div class=\"color-palette-grid\">
              ${selectedColors.map(color => `
                <div class=\"color-palette-item\">
                  <div class=\"color-palette-swatch\" style=\"background-color: ${color};\"></div>
                  <span class=\"color-palette-label\">${color}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </section>
      </body>
    </html>
  `;

  return { html, darkestColor, lightestColor };
}

export function generateTypographySectionHTML(
  selectedFont: string,
  selectedColors: string[]
): { html: string, darkestColor: string, lightestColor: string } {
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

  // Font family mapping
  const getFontFamily = (fontName: string) => {
    const fontMap: { [key: string]: string } = {
      'inter': 'Inter, sans-serif',
      'roboto': 'Roboto, sans-serif',
      'open-sans': 'Open Sans, sans-serif',
      'poppins': 'Poppins, sans-serif',
      'montserrat': 'Montserrat, sans-serif',
      'playfair-display': 'Playfair Display, serif',
      'merriweather': 'Merriweather, serif',
      'source-sans-pro': 'Source Sans Pro, sans-serif',
      'raleway': 'Raleway, sans-serif',
      'lato': 'Lato, sans-serif'
    };
    return fontMap[fontName] || 'Inter, sans-serif';
  };

  // CSS for the TypographySection
  const componentStyles = `
    html, body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Arial', sans-serif;
      background: #f8fafc;
      width: 100vw;
      height: 100vh;
      min-height: 100vh;
      min-width: 100vw;
    }
    .typography-section {
      margin-bottom: 3rem;
      height: 100vh;
      width: 100vw;
      max-width: 900px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .typography-card {
      position: relative;
      padding: 2rem 1.5rem;
      min-height: 100px;
      background: linear-gradient(135deg, ${lightestColor}20 0%, ${darkestColor}10 100%);
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
    .typography-accent {
      position: absolute;
      left: 0;
      top: 1.5rem;
      height: 3rem;
      width: 0.5rem;
      border-radius: 0 0.5rem 0.5rem 0;
      background: ${darkestColor};
    }
    .typography-title {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      margin-left: 1rem;
      color: ${darkestColor};
      margin-top: 0;
    }
    .typography-selected-font {
      font-size: 1.125rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
      margin-left: 0.5rem;
      color: #374151;
    }
    .typography-samples {
      background: #fff;
      border-radius: 0.5rem;
      padding: 2rem 1.5rem;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
      border: 1px solid #e5e7eb;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .typography-sample-label {
      font-size: 0.95rem;
      color: #6b7280;
      margin-bottom: 0.25rem;
      font-weight: 500;
    }
    .typography-heading {
      font-size: 3rem;
      font-weight: bold;
      font-family: ${getFontFamily(selectedFont)};
    }
    .typography-subheading {
      font-size: 1.5rem;
      font-weight: 600;
      font-family: ${getFontFamily(selectedFont)};
    }
    .typography-body {
      font-size: 1rem;
      line-height: 1.7;
      font-family: ${getFontFamily(selectedFont)};
    }
    .typography-caption {
      font-size: 0.875rem;
      color: #6b7280;
      font-family: ${getFontFamily(selectedFont)};
    }
    @media print {
      html, body {
        width: 297mm;
        height: 210mm;
      }
      .typography-section {
        width: 297mm;
        max-width: 297mm;
      }
      .typography-card {
        width: 100%;
      }
    }
  `;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset=\"UTF-8\">
        <title>Typography Section PDF</title>
        <style>${componentStyles}</style>
      </head>
      <body style=\"margin:0;padding:0;\">
        <section class=\"typography-section\">
          <div class=\"typography-card\">
            <div class=\"typography-accent\"></div>
            <h2 class=\"typography-title\">Typography</h2>
            <div class=\"typography-selected-font\">Selected Font: ${selectedFont}</div>
            <div class=\"typography-samples\">
              <div>
                <div class=\"typography-sample-label\">Heading (48px)</div>
                <div class=\"typography-heading\">Brand Identity</div>
              </div>
              <div>
                <div class=\"typography-sample-label\">Subheading (24px)</div>
                <div class=\"typography-subheading\">Creating memorable experiences</div>
              </div>
              <div>
                <div class=\"typography-sample-label\">Body Text (16px)</div>
                <div class=\"typography-body\">This is how your brand will communicate with your audience. The typography you've chosen reflects your brand's personality and ensures readability across all platforms.</div>
              </div>
              <div>
                <div class=\"typography-sample-label\">Caption (14px)</div>
                <div class=\"typography-caption\">Supporting text and captions</div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  `;

  return { html, darkestColor, lightestColor };
}

export function generateBrandVoiceSectionHTML(
  selectedVoice: import("@/types/branding/brand-voice-claude-response").BrandVoice | null,
  selectedColors: string[]
): { html: string, darkestColor: string, lightestColor: string } {
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

  // CSS for the BrandVoiceSection
  const componentStyles = `
    html, body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Arial', sans-serif;
      background: #f8fafc;
      width: 100vw;
      height: 100vh;
      min-height: 100vh;
      min-width: 100vw;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
    .brand-voice-section {
      margin-bottom: 3rem;
      width: 100vw;
      max-width: 900px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .brand-voice-card {
      position: relative;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
      padding: 2rem 1.5rem;
      min-height: 100px;
      background: linear-gradient(135deg, ${lightestColor}20 0%, ${darkestColor}10 100%);
      width: 100%;
      box-sizing: border-box;
    }
    .brand-voice-accent {
      position: absolute;
      left: 0;
      top: 1.5rem;
      height: 3rem;
      width: 0.5rem;
      border-radius: 0 0.5rem 0.5rem 0;
      background: ${darkestColor};
    }
    .brand-voice-title {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      margin-left: 1rem;
      color: ${darkestColor};
      margin-top: 0;
    }
    .brand-voice-content {
      margin-top: 2rem;
    }
    .brand-voice-inner-card {
      background: #fff;
      border-radius: 0.5rem;
      padding: 2rem 1.5rem;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
      border: 1px solid #e5e7eb;
      margin-bottom: 1.5rem;
    }
    .brand-voice-name {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .brand-voice-description {
      color: #374151;
      margin-bottom: 1.5rem;
      white-space: pre-line;
    }
    .brand-voice-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .brand-voice-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .brand-voice-label {
      font-size: 0.95rem;
      font-weight: 500;
      color: #6b7280;
      margin-bottom: 0.5rem;
    }
    .brand-voice-hero, .brand-voice-descriptive {
      background: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }
    .brand-voice-hero p {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }
    .brand-voice-descriptive p {
      font-size: 1rem;
      color: #374151;
      margin: 0;
    }
    .brand-voice-persona {
      margin-top: 1.5rem;
    }
    .brand-voice-persona-label {
      font-size: 0.95rem;
      font-weight: 500;
      color: #6b7280;
      margin-bottom: 0.5rem;
    }
    .brand-voice-persona-content {
      background: #f9fafb;
      padding: 1rem;
      border-radius: 0.5rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    @media (min-width: 768px) {
      .brand-voice-persona-content {
        grid-template-columns: 1fr 1fr;
      }
    }
    .brand-voice-persona-item {
      font-size: 0.98rem;
      color: #374151;
    }
    .brand-voice-persona-item strong {
      color: #111827;
      font-weight: 600;
    }
    .brand-voice-no {
      color: #9ca3af;
      text-align: center;
      font-size: 1.1rem;
      padding: 2rem 0;
    }
    @media print {
      html, body {
        width: 297mm;
        height: 210mm;
      }
      .brand-voice-section {
        width: 297mm;
        max-width: 297mm;
      }
      .brand-voice-card {
        width: 100%;
      }
    }
  `;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset=\"UTF-8\">
        <title>Brand Voice Section PDF</title>
        <style>${componentStyles}</style>
      </head>
      <body style=\"margin:0;padding:0;\">
        <section class=\"brand-voice-section\">
          <div class=\"brand-voice-card\">
            <div class=\"brand-voice-accent\"></div>
            <h2 class=\"brand-voice-title\">Brand Voice</h2>
            <div class=\"brand-voice-content\">
              ${selectedVoice ? `
                <div class=\"brand-voice-inner-card\">
                  <div class=\"brand-voice-name\">${selectedVoice.name}</div>
                  <div class=\"brand-voice-description\">${selectedVoice.description}</div>
                  <div class=\"brand-voice-grid\">
                    <div>
                      <div class=\"brand-voice-label\">Hero Text</div>
                      <div class=\"brand-voice-hero\"><p>${selectedVoice.hero}</p></div>
                    </div>
                    <div>
                      <div class=\"brand-voice-label\">Descriptive Text</div>
                      <div class=\"brand-voice-descriptive\"><p>${selectedVoice.descriptive}</p></div>
                    </div>
                  </div>
                  <div class=\"brand-voice-persona\">
                    <div class=\"brand-voice-persona-label\">Brand Persona</div>
                    <div class=\"brand-voice-persona-content\">
                      <div class=\"brand-voice-persona-item\"><strong>Name & Age:</strong> ${selectedVoice.persona.name}, ${selectedVoice.persona.age} years old</div>
                      <div class=\"brand-voice-persona-item\"><strong>Occupation:</strong> ${selectedVoice.persona.occupation}</div>
                      <div class=\"brand-voice-persona-item\"><strong>Background:</strong> ${selectedVoice.persona.background}</div>
                      <div class=\"brand-voice-persona-item\"><strong>Personality:</strong> ${selectedVoice.persona.personality}</div>
                      <div class=\"brand-voice-persona-item\"><strong>Communication Style:</strong> ${selectedVoice.persona.communicationStyle}</div>
                    </div>
                  </div>
                </div>
              ` : `
                <div class=\"brand-voice-inner-card\">
                  <div class=\"brand-voice-no\">No brand voice selected.</div>
                </div>
              `}
            </div>
          </div>
        </section>
      </body>
    </html>
  `;

  return { html, darkestColor, lightestColor };
}

export function generateImageryDirectionSectionHTML(
  selectedImageryDirection: import("@/stores/use-branding-store").ImageryDirection | null,
  selectedColors: string[]
): { html: string, darkestColor: string, lightestColor: string } {
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

  // CSS for the ImageryDirectionSection
  const componentStyles = `
    html, body {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Arial', sans-serif;
      background: #f8fafc;
      width: 100vw;
      height: 100vh;
      min-height: 100vh;
      min-width: 100vw;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
    .imagery-direction-section {
      margin-bottom: 3rem;
      width: 100vw;
      max-width: 900px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    .imagery-direction-card {
      position: relative;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
      padding: 2rem 1.5rem;
      min-height: 100px;
      background: linear-gradient(135deg, ${lightestColor}20 0%, ${darkestColor}10 100%);
      width: 100%;
      height
      box-sizing: border-box;
    }
    .imagery-direction-accent {
      position: absolute;
      left: 0;
      top: 1.5rem;
      height: 3rem;
      width: 0.5rem;
      border-radius: 0 0.5rem 0.5rem 0;
      background: ${darkestColor};
    }
    .imagery-direction-title {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      margin-left: 1rem;
      color: ${darkestColor};
      margin-top: 0;
    }
    .imagery-direction-content {
      margin-top: 2rem;
    }
    .imagery-direction-inner-card {
      background: #fff;
      border-radius: 0.5rem;
      padding: 2rem 1.5rem;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
      border: 1px solid #e5e7eb;
      margin-bottom: 1.5rem;
    }
    .imagery-direction-keyword {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .imagery-direction-description {
      color: #374151;
      margin-bottom: 1.5rem;
      white-space: pre-line;
    }
    .imagery-direction-visual-title {
      font-size: 0.95rem;
      font-weight: 500;
      color: #6b7280;
      margin-bottom: 0.5rem;
    }
    .imagery-direction-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    @media (min-width: 768px) {
      .imagery-direction-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    .imagery-direction-image {
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: #fff;
      overflow: hidden;
    }
    .imagery-direction-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .imagery-direction-placeholder {
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px dashed #d1d5db;
      border-radius: 0.5rem;
      background: #f9fafb;
      color: #9ca3af;
      font-size: 0.95rem;
      flex-direction: column;
      padding: 1rem;
    }
    .imagery-direction-placeholder-icon {
      width: 2rem;
      height: 2rem;
      background: #e5e7eb;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .imagery-direction-no {
      color: #9ca3af;
      text-align: center;
      font-size: 1.1rem;
      padding: 2rem 0;
    }
    @media print {
      html, body {
        width: 297mm;
        height: 210mm;
      }
      .imagery-direction-section {
        width: 297mm;
        max-width: 297mm;
      }
      .imagery-direction-card {
        width: 100%;
      }
    }
  `;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset=\"UTF-8\">
        <title>Imagery Direction Section PDF</title>
        <style>${componentStyles}</style>
      </head>
      <body style=\"margin:0;padding:0;\">
        <section class=\"imagery-direction-section\">
          <div class=\"imagery-direction-card\">
            <div class=\"imagery-direction-accent\"></div>
            <h2 class=\"imagery-direction-title\">Imagery Direction</h2>
            <div class=\"imagery-direction-content\">
              ${selectedImageryDirection ? `
                <div class=\"imagery-direction-inner-card\">
                  <div class=\"imagery-direction-keyword\">${selectedImageryDirection.keyword}</div>
                  <div class=\"imagery-direction-description\">${selectedImageryDirection.description}</div>
                  <div>
                    <div class=\"imagery-direction-visual-title\">Visual Style Preview</div>
                    <div class=\"imagery-direction-grid\">
                      ${selectedImageryDirection.images && selectedImageryDirection.images.length > 0 ? selectedImageryDirection.images.map((image, index) => `
                        <div class=\"imagery-direction-image\">
                          <img src=\"${image.urls.regular}\" alt=\"${image.alt_description || `Imagery sample ${index + 1}`}\" />
                        </div>
                      `).join('') : [1,2,3,4].map(i => `
                        <div class=\"imagery-direction-placeholder\">
                          <div class=\"imagery-direction-placeholder-icon\"></div>
                          Image ${i}
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              ` : `
                <div class=\"imagery-direction-inner-card\">
                  <div class=\"imagery-direction-no\">No imagery direction selected.</div>
                </div>
              `}
            </div>
          </div>
        </section>
      </body>
    </html>
  `;

  return { html, darkestColor, lightestColor };
}