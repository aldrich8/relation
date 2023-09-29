import path from "path";

export interface Eligible {
    id: string;
    isEligible: boolean;
    path: string;
    isPreset: boolean;
    relativePath: string;
}

export default class Disposition {
    constructor(private readonly generateOptions = {}) {
    }

    public scan() {
        console.log('scan');
    }

    public getCurrentDisposition() {
        console.log('getCurrentDisposition');
    }

    public eligible(id: string): Eligible {
        return {
            id,
            isEligible: true,
            path: path.resolve(__dirname, "..", 'visualizations'),
            relativePath: path.relative(path.resolve(__dirname, "..", 'visualizations'), path.resolve(__dirname, "..", 'visualizations')),
            isPreset: false,
        };
    }
}
