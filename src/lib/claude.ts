/* eslint-disable @typescript-eslint/no-explicit-any */
import Anthropic from '@anthropic-ai/sdk';
import { BrandDiscovery } from "@/types/branding/brand-discovery.interface";
import { ClaudeResult } from '@/types/claude-result';
import { ColorPaletteClaudeResponse } from '@/types/branding/color-palette-claude-response';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Main function to prompt Claude with brand context
 * 
 * @param userPrompt - What you want Claude to do
 * @param responseFormat - Exact format specification for the response
 * @param brandDiscovery - Complete brand context object
 * @param options - Optional parameters (model, maxTokens)
 */
export async function promptClaude<T = any>(
  userPrompt: string,
  responseFormat: string,
  brandDiscovery: BrandDiscovery,
  options?: {
    model?: string;
    maxTokens?: number;
  }
): Promise<ClaudeResult<T>> {
  try {
    const {
      model = 'claude-sonnet-4-20250514',
      maxTokens = 4000
    } = options || {};

    // Build the comprehensive prompt with brand context
    const fullPrompt = buildPrompt(userPrompt, responseFormat, brandDiscovery);

    // Make the API call
    const response = await client.messages.create({
      model,
      max_tokens: maxTokens,
      messages: [
        {
          role: 'user',
          content: fullPrompt
        }
      ]
    });

    // Extract and parse the response
    const rawResponse = extractTextFromResponse(response);
    const parsedData = parseStructuredResponse<T>(rawResponse, responseFormat);

    return {
      success: true,
      data: parsedData,
      rawResponse: rawResponse
    };

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      rawResponse: undefined
    };
  }
}

/**
 * Build a comprehensive prompt with brand context and format instructions
 */
function buildPrompt(
  userPrompt: string,
  responseFormat: string,
  brandDiscovery: BrandDiscovery
): string {
  return `
You are a professional brand strategist and designer. You will be provided with comprehensive brand discovery information about a company, and you need to complete a specific brand-related task.

BRAND CONTEXT:
${JSON.stringify(brandDiscovery, null, 2)}

TASK:
${userPrompt}

RESPONSE FORMAT REQUIREMENTS:
${responseFormat}

IMPORTANT INSTRUCTIONS:
1. Base all recommendations on the provided brand context
2. Ensure your response matches EXACTLY the specified format
3. If the format specifies JSON, return valid JSON only
4. Consider the company's industry, target audience, and brand values in your recommendations
5. Provide thoughtful, professional recommendations that align with the brand's identity
6. If any brand context is missing or unclear, make reasonable assumptions based on industry best practices

Please provide your response in the exact format specified above.
  `;
}

/**
 * Extract text content from Claude's response
 */
function extractTextFromResponse(response: any): string {
  if (response.content && Array.isArray(response.content)) {
    const textContent = response.content.find((item: any) => item.type === 'text');
    return textContent?.text || '';
  }
  return '';
}

/**
 * Parse structured response (JSON or other formats)
 */
function parseStructuredResponse<T>(rawResponse: string, expectedFormat: string): T {
  // Clean the response text
  const cleanedResponse = rawResponse.trim();

  // Check if expecting JSON format
  if (expectedFormat.toLowerCase().includes('json')) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : cleanedResponse;
      return JSON.parse(jsonString) as T;
    } catch (error) {
      throw new Error(`Failed to parse JSON response: ${error}`);
    }
  }

  // For non-JSON formats, return the raw response
  return cleanedResponse as unknown as T;
}

// Example usage functions demonstrating how to use promptClaude

/**
 * Example: Generate a color palette
 */
export async function generateColorPalette(
  brandDiscovery: BrandDiscovery
): Promise<ClaudeResult<ColorPaletteClaudeResponse>> {
  return promptClaude<ColorPaletteClaudeResponse>(
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
}


/*
USAGE EXAMPLES:

// Color palette example (your specific use case)
const colorResult = await promptClaude<ColorPaletteClaudeResponse>(
  "Generate a brand color palette of 5 colors that would work well for this company",
  `Return a JSON object with this exact structure:
  {
    "colors": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"],
    "description": "A detailed explanation of why this palette was recommended"
  }`,
  brandDiscoveryData
);

if (colorResult.success) {
  console.log('Colors:', colorResult.data?.colors);
  console.log('Description:', colorResult.data?.description);
}

// Email signature example
const signatureResult = await promptClaude<EmailSignatureClaudeResponse>(
  "Generate a professional email signature for John Doe (CEO) with contact info",
  `Return JSON: { "htmlSignature": "...", "plainTextSignature": "...", "setupInstructions": "..." }`,
  brandDiscoveryData
);

// Custom brand guidelines
const guidelinesResult = await promptClaude<BrandGuidelinesClaudeResponse>(
  "Create comprehensive brand guidelines covering typography, colors, logo usage, tone of voice, and imagery",
  `Return JSON with guidelines object containing typography, colorUsage, logoUsage, toneOfVoice, imagery fields and a summary`,
  brandDiscoveryData
);
*/