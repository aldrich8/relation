import Disposition from "./Disposition";
import Template, { TemplateID } from "./Template";
import Module from "./Module";

export default class Generator {
    protected readonly _disposition: Disposition;

    constructor(generateOptions = {}) {
        this._disposition = new Disposition(generateOptions);
    }

    public async scan(templateID: TemplateID, options = {}): Promise<Module | undefined> {
        const template = new Template(this, this._disposition);
        await template.graph(templateID, options);
        return template.getGraph();
    }
}
