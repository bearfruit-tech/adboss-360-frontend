// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ClaudeResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    rawResponse?: string;
}