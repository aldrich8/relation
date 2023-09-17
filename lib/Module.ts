import Generator from "./Generator";
import Disposition, { Eligible } from "./Disposition";
import { getDirectoryFiles, isDirectory } from "./utils";
import path from "path";

export default class Module {
  public value: Module | undefined;
  public children: Set<Module> = new Set<Module>();

  constructor(
    protected readonly modulePath: Eligible["path"],
    protected readonly ctx: Generator,
    protected readonly disposition: Disposition,
    public readonly parent: Module | undefined = undefined
  ) {
    this.prepare(modulePath);
  }

  async prepare(modulePath: string) {
    /**
     * 在调用Module的之前已经检查过路径存在性
     * 只需要检查是否为目录即可
     */
    const result = await isDirectory(modulePath);
    if (!result.isModule) {
      return;
    }

    if (result.isDir) {
      this.correlation(modulePath);
      return;
    }

    this.value = this.parent;
  }

  public correlation(modulePath: string) {
    // @ts-ignore
    const _this = this || this.parent;
    getDirectoryFiles(modulePath).then((files) => {
      (files as string[]).forEach((moduleFileName) => {
        const m = new Module(path.join(modulePath, moduleFileName), this.ctx, this.disposition, _this);
        if(_this) {
          _this.children.add(m);
        }
      });
    });
  }
}
