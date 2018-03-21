import { Vertex, Graph } from "./graph";

let a = new Vertex("a");
let b = new Vertex("b");
let c = new Vertex("c");
let d = new Vertex("d");
let e = new Vertex("e");
let f = new Vertex("f");
let g = new Vertex("g");
let h = new Vertex("h");
let i = new Vertex("i");

a.connect(b, 4);
a.connect(h, 8);
b.connect(h, 11);
b.connect(c, 8);
h.connect(g, 1);
h.connect(i, 7);
c.connect(i, 2);
g.connect(i, 6);
c.connect(d, 7);
g.connect(f, 2);
c.connect(f, 4);
d.connect(f, 14);
d.connect(e, 9);
f.connect(e, 10);

let graph = new Graph();
graph.addVertices([a, b, c, d, e, f, g, h, i]);

console.log(graph.getSPT("a"));
