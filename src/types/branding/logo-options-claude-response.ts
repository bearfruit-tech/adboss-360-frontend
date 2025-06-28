export interface LogoOptionClaudeResponse {
  logos: Array<{
    name: string;
    description: string;
    svg: string;
  }>;
  description: string;
} 