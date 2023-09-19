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
    protected readonly ctx: Generator;
    protected readonly disposition: Disposition;
    value: Record<string | number | symbol, any>;
    /**
     * 子模块
     */
    children: Set<Module>;
    /**
     * 当前路径
     */
    path: string;
    /**
     * 是否模块：任何的文件都属于模块
     */
    istExist: boolean;
    /**
     * 目录类型
     */
    isDirectory: boolean;
    constructor(ctx: Generator, disposition: Disposition);
    prepare(modulePath: string): Promise<void>;
    correlation(modulePath: string): Promise<void>;
}
type TemplateID = string;
export class Generator {
    protected readonly _disposition: Disposition;
    constructor(generateOptions?: {});
    scan(templateID: TemplateID, options?: {}): Promise<Module | undefined>;
}
export default Generator;

//# sourceMappingURL=types.d.ts.map
