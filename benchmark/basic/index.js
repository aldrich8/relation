const G = require("../../dist/bin");

const fs = require("fs");

const ejs = require("ejs");
const path = require("path");

const g = new G.default()

g.scan("form", {}).then(result => {
    transform(result);
})

function transform(module) {
    const modules = flatten(module);
    modules.forEach((module) => {
        toFile(module, "test");
    })
}

function toFile(moduleJSONValues, fileName) {
    const file = moduleJSONValues.path;
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        const content = data.toString();
        const result = ejs.render(content, {
            config: {
                stylelint: "require"
            }
        });

        const dir = path.resolve("..", "demos");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        fs.writeFile(path.resolve("demos", `${moduleJSONValues.value.name}${moduleJSONValues.value.ext}`), result, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
        });
    });
}

function getChildren(module) {
    const children = module.children;
    if (children.size) {
        return children;
    }
    return null;
}

function toJSON(module) {
    return {
        path: module.path,
        isModule: module.isModule,
        value: module.value || {},
    }
}

function flatten(module) {
    const result = [];

    function inner(module) {
        const isModule = module.isModule;

        if(isModule) {
            result.push(toJSON(module));
        }

        const children = getChildren(module);
        if (children) {
            children.forEach(child => {
                inner(child);
            });
        }
    }

    inner(module);

    return result;
}