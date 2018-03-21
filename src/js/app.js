import { Vertex, Graph } from "./graph";

let v0 = new Vertex("0");
let v1 = new Vertex("1");
let v2 = new Vertex("2");
let v3 = new Vertex("3");
let v4 = new Vertex("4");
let v5 = new Vertex("5");
let v6 = new Vertex("6");
let v7 = new Vertex("7");
let v8 = new Vertex("8");

v0.connect(v1, 4);
v0.connect(v7, 8);
v1.connect(v7, 11);
v1.connect(v2, 8);
v7.connect(v6, 1);
v7.connect(v8, 7);
v2.connect(v8, 2);
v6.connect(v8, 6);
v2.connect(v3, 7);
v6.connect(v5, 2);
v2.connect(v5, 4);
v3.connect(v5, 14);
v3.connect(v4, 9);
v5.connect(v4, 10);

let graph = new Graph();
graph.addVertices([v0, v1, v2, v3, v4, v5, v6, v7, v8]);

console.log(graph.bfs("0"));
console.log(graph.getSPT("0"));
console.log(graph.dijkstra("0", "4"));
