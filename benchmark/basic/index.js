const G = require("../../dist/bin");

const g = new G.default()

g.scan("form", {}).then(result => {
    console.log("form result", result.children.size);
    const isChildren = result.children.size;
    if(isChildren) {
        console.log("form children", result);
    }
})
