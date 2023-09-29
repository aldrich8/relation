export interface IParse {
    parse?: (content: string, data: Record<string, any>) => string | Promise<string>;
    
    parseFile?: (path: string, data: Record<string, any>) => Promise<string>;

    transform?: (content: string, data: Record<string, any>) => string;

    transformFile?: (path: string, data: Record<string, any>) => Promise<string>;
}