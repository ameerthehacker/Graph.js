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
  getSPT(source) {
    const sourceVertex = this.findVertexByName(source);
    if (sourceVertex != null) {
      let spt = {};
      let set = {};
      this.vertices.forEach(vertex => {
        // If it is the source keep its distance as 0
        if (vertex.name == source) {
          set[vertex.name] = { distance: 0, parent: vertex.name };
        } else {
          set[vertex.name] = { distance: Infinity, parent: vertex.name };
        }
      });
      // Keep doing stuffs untill all vertices are transfered to spt
      while (Object.keys(set).length != Object.keys(spt).length) {
        // Get the set difference between spt and set
        let diffSet = {};
        Object.keys(set).forEach(vertexName => {
          if (spt[vertexName] === undefined) {
            diffSet[vertexName] = set[vertexName];
          }
        });
        // Find the vertex having minimum distance in set
        let min = { name: "", distance: Infinity, parent: "" };
        Object.keys(diffSet).forEach(vertexName => {
          if (diffSet[vertexName].distance < min.distance) {
            min.name = vertexName;
            min.distance = diffSet[vertexName].distance;
            min.parent = diffSet[vertexName].parent;
          }
        });
        // Add the min vertex details to spt
        spt[min.name] = { distance: min.distance, parent: min.parent };
        let minVertex = this.findVertexByName(min.name);
        // Update the adjacent vertices distance in the set
        minVertex.edges.forEach(edge => {
          let newDistance = min.distance + edge.distance;
          if (newDistance < set[edge.toVertex.name].distance) {
            set[edge.toVertex.name].distance = newDistance;
            set[edge.toVertex.name].parent = minVertex.name;
          }
        });
      }
      return spt;
    }
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
