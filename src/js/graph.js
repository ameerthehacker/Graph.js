import { Queue } from "./queue";

// Class for creating vertex
export class Vertex {
  constructor(name) {
    this.name = name;
    this.visited = false;
    this.edges = [];
  }
  connect(toVertex, distance) {
    // Create an edge for yourself
    const myEdge = new Edge(this, toVertex, distance);
    this.edges.push(myEdge);
    // Create an edge for the other edge
    const toVertexEdge = new Edge(toVertex, this, distance);
    toVertex.edges.push(toVertexEdge);
  }
}
// Class for creating edges connecting vertices
export class Edge {
  constructor(fromVertex, toVertex, distance) {
    this.fromVertex = fromVertex;
    this.toVertex = toVertex;
    this.distance = distance;
  }
}
// Class for defining vertices that belong to a graph
export class Graph {
  constructor() {
    this.vertices = [];
  }
  addVertices(vertices) {
    if (typeof vertices == "object" || typeof vertices == "array") {
      vertices.forEach(vertex => {
        this.vertices.push(vertex);
      });
    } else {
      this.vertices.push(vertices);
    }
  }
  setVisitedStatus(visitedStatus) {
    this.vertices.forEach(vertex => {
      vertex.visited = visitedStatus;
    });
  }
  findVertexByName(name) {
    return this.vertices.find(vertex => vertex.name == name);
  }
  bfs(source) {
    const sourceVertex = this.findVertexByName(source);
    const queue = new Queue();
    let bfsResult = [];
    this.setVisitedStatus(false);

    if (sourceVertex != null) {
      queue.enQueue(sourceVertex);

      while (!queue.isEmpty()) {
        const vertex = queue.deQueue();

        if (!vertex.visited) {
          vertex.visited = true;
          bfsResult.push(vertex);
        }
        vertex.edges.forEach(edge => {
          if (!edge.toVertex.visited) {
            queue.enQueue(edge.toVertex);
          }
        });
      }

      return bfsResult;
    } else {
      throw new Error(`Vertex with name ${source} not found`);
    }
  }
}
