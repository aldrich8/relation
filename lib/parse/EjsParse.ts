import { readFile } from "fs";
import { IParse } from "./Parse";
import ejs from "ejs";

export default class EjsParse implements IParse {
  public parse(content: string, data: Record<string, any>): string {
    return ejs.render(content, data);
  }

  public async parseFile(path: string, data: any): Promise<string> {
    return new Promise((resolve, reject) => {
      readFile(path, (err, content) => {
        if (err) {
          return reject(err);
        }

        resolve(this.parse(content.toString(), data));
      });
    });
  }
}