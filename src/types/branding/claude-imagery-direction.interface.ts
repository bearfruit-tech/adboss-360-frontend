export interface ClaudeImageryResponse {
    imagerySets: ImagerySet[]
}

export interface ImagerySet {
    id: string,
    keyword: string,
    description: string
}