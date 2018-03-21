import { Vertex, Graph } from "./graph";

let a = new Vertex("a");
let b = new Vertex("b");
let c = new Vertex("c");
let d = new Vertex("d");

a.connect(b);
a.connect(c);
b.connect(c);
c.connect(a);
c.connect(d);
d.connect(d);

let g = new Graph();
g.addVertices([a, b, c, d]);

console.log(g.bfs("c"));
