export interface TypographyClaudeResponse {
    typographies: TypographyFont[],
    description: string
}

export interface TypographyFont {
    fontName: string,
    fontStack: string,
    preview: {
        header: string,
        subtitle: string,
        content: string,
        smallText: string
    }
}
