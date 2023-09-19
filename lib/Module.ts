import Generator from "./Generator";
import Disposition from "./Disposition";
import { getDirectoryFiles, isDirectory } from "./utils";
import path from "path";

export default class Module {
  public value: Record<string | number | symbol, any> = {};

  /**
   * 子模块
   */
  public children: Set<Module> = new Set<Module>();

  /**
   * 当前路径
   */
  public path: string = '';

  /**
   * 是否模块：任何的文件都属于模块
   */
  public istExist: boolean = false;

  /**
   * 目录类型
   */
  public isDirectory: boolean = false;

  constructor(
    protected readonly ctx: Generator,
    protected readonly disposition: Disposition,
  ) {}

  async prepare(modulePath: string) {
    this.path = modulePath;

    /**
     * 在调用Module的之前已经检查过路径存在性
     * 只需要检查是否为目录即可
     */
    const result = await isDirectory(modulePath);

    this.isDirectory = result.isDir;
    this.istExist = result.isModule;

    if (!result.isModule) {
      return;
    }

    if (result.isDir) {
      await this.correlation(modulePath);
      return;
    }

    this.value = {};
  }

  public async correlation(modulePath: string) {
    const files = await getDirectoryFiles(modulePath) as string[];
    for (const moduleFileName of files) {
        const submodulePath = path.join(modulePath, moduleFileName);
        const submodule = new Module(this.ctx, this.disposition);
        await submodule.prepare(submodulePath);
        this.children.add(submodule);
    }
  }
}
