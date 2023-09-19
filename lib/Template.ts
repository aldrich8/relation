import Generator from "./Generator";
import Disposition from "./Disposition";
import Module from "./Module";

export type TemplateID = string;

export interface TemplateOptions {}

export default class Template {
  private _module: Module | undefined;

  constructor(
    private readonly ctx: Generator,
    private readonly disposition: Disposition
  ) {}

  public async graph(id: TemplateID, options: TemplateOptions) {
    const eligible = this.disposition.eligible(id);
    if (eligible.isEligible) {
      const rootModule = new Module(this.ctx, this.disposition);
      await rootModule.prepare(`${eligible.path}/${eligible.id}`);
      this._module = rootModule;
    }
  }

  public getGraph() {
    return this._module;
  }
}
