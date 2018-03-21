# Graph.js :rocket:

A simple graph ADT made for JavaScript :fire:

# How to import this :question:

1.  Download the file **graph.min.js** from **dist** directory
2.  Include the JavaScript file in your webpage

```javascript
<script src="graph.js" type="text/javascript">
```

# How to use this :question:

To explain the usage I'm using a simple graph diagram from [geeksforgeeks](https://www.geeksforgeeks.org/greedy-algorithms-set-6-dijkstras-shortest-path-algorithm/)

![Graph Image](./src/images/graph.jpg)

## Create Graph in code

To replicate the above graph in code we create objects for **vertices**, **edges** and an object to represent the **graph** itself

```javascript
/**
 * Create objects for all vertices
 * Format: var v = new Vertex(<VertexName>);
 **/

var v0 = new Vertex("0");
var v1 = new Vertex("1");
var v2 = new Vertex("2");
var v3 = new Vertex("3");
var v4 = new Vertex("4");
var v5 = new Vertex("5");
var v6 = new Vertex("6");
var v7 = new Vertex("7");
var v8 = new Vertex("8");
```

Now let's create the edges between the vertices

```javascript
/**
 * Create edges between vertices
 * Format: v1.connect(v2, <distance>)
 * Here v1 is the source vertex and v2 is the destination vertex
 **/

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
```

Add all the vertices to graph so that you can perform some operations on them

```javascript
var graph = new Graph();
graph.addVertices([v0, v1, v2, v3, v4, v5, v6, v7, v8]);
```

# Supported Operations

## Minimum Spanning Tree

You can get minimum distance from source vertex to all other connected vertices

```javascript
var spt = graph.getSPT("0");
console.log(spt);
```

This will print the following JSON in the console

```json
{
  "0": { "distance": 0, "parent": null },
  "1": { "distance": 4, "parent": "0" },
  "2": { "distance": 12, "parent": "1" },
  "3": { "distance": 19, "parent": "2" },
  "4": { "distance": 21, "parent": "5" },
  "5": { "distance": 11, "parent": "6" },
  "6": { "distance": 9, "parent": "7" },
  "7": { "distance": 8, "parent": "0" },
  "8": { "distance": 14, "parent": "2" }
}
```

## Find the shortest path between two vertices

You can find the shortest path between two vertices using **Dijkstra** algorithm

```javascript
var path = graph.dijkstra("0");
console.log(path);
```

This will print the following array in the console

```json
["0", "7", "6", "5", "4"]
```

This function returns false if the destination is not reachable

## Utilities

You can get the name of the vertex object as follows

```javascript
var v = new Vertex("0");
var name = v.name;
```

You can search a vertex object by name in the graph object as follows

```javascript
var graph = new Graph();
var v0 = new Vertex("0");
...
...
graph.addVertices([v0, v1, ....]);
var vertex = graph.findVertexByName("0");
```

This function returns **null** if the vertex is not found

## License

MIT © [Ameer Jhan](mailto:ameerjhanprof@gmail.com)
