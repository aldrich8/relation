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

  public graph(id: TemplateID, options: TemplateOptions) {
    const eligible = this.disposition.eligible(id);
    if (eligible.isEligible) {
      this._module = new Module(eligible.path, this.ctx, this.disposition);
      console.log("this___", this._module);
    }
  }

  public getGraph() {
    return this._module;
  }
}
