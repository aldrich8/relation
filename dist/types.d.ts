interface Eligible {
    id: string;
    isEligible: boolean;
    path: string;
    isPreset: boolean;
}
declare class Disposition {
    constructor(generateOptions?: {});
    scan(): void;
    getCurrentDisposition(): void;
    eligible(id: string): Eligible;
}
declare class Module {
    protected readonly modulePath: Eligible["path"];
    protected readonly ctx: Generator;
    protected readonly disposition: Disposition;
    readonly parent: Module | undefined;
    value: Module | undefined;
    children: Set<Module>;
    constructor(modulePath: Eligible["path"], ctx: Generator, disposition: Disposition, parent?: Module | undefined);
    prepare(modulePath: string): Promise<void>;
    correlation(modulePath: string): void;
}
type TemplateID = string;
interface TemplateOptions {
}
declare class Template {
    constructor(ctx: Generator, disposition: Disposition);
    graph(id: TemplateID, options: TemplateOptions): void;
    getGraph(): Module | undefined;
}
export class Generator {
    protected readonly _disposition: Disposition;
    constructor(generateOptions?: {});
    scan(templateID: TemplateID, options?: {}): Template;
}
export default Generator;

//# sourceMappingURL=types.d.ts.map
