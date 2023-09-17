const G = require("../../dist/bin");

const g = new G.default()

const template = g.scan("form", {});

const graph = template.getGraph();

console.log('getGraph', graph.children);