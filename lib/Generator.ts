import Disposition from "./Disposition";
import Template, { TemplateID } from "./Template";

export default class Generator {
    protected readonly _disposition: Disposition;

    constructor(generateOptions = {}) {
        this._disposition = new Disposition(generateOptions);
    }

    public scan(templateID: TemplateID, options = {}): Template {
        const template = new Template(this, this._disposition);
        template.graph(templateID, options);
        return template
    }
}
