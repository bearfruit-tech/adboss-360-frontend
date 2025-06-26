export interface BrandVoiceClaudeResponse {
    brandVoices: BrandVoice[],
    description: string
}

export interface BrandVoice {
    id: string,
    name: string,
    description: string,
    hero: string,
    descriptive: string,
    persona: {
        name: string,
        age: number,
        occupation: string,
        background: string,
        personality: string,
        communicationStyle: string
    }
}