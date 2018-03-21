import { Queue } from "./queue";
import { isArray } from "util";

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
    if (isArray(vertices)) {
      vertices.forEach(vertex => {
        if (this.findVertexByName(vertex.name)) {
          throw new Error(
            `Vertex with name ${vertex.name} already exists in the graph!`
          );
        }
        this.vertices.push(vertex);
      });
    } else {
      if (this.findVertexByName(vertices.name)) {
        throw new Error(
          `Vertex with name ${vertices.name} already exists in the graph!`
        );
      }
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
          set[vertex.name] = { distance: 0, parent: null };
        } else {
          set[vertex.name] = { distance: Infinity, parent: null };
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
          if (diffSet[vertexName].distance <= min.distance) {
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
    } else {
      throw new Error(`Vertex with name ${source} not found`);
    }
  }

  dijkstra(source, destination) {
    // Get the minimum spanning tree
    const spt = this.getSPT(source);
    // Initialize backrub with the destination
    let path = [destination];
    if (spt != null && spt[destination] != null) {
      let vertex = spt[destination].parent;
      // If the destination and source are same don't return false
      if (vertex == null && source != destination) {
        return false;
      } else {
        // Traverse through the vertices until you find the parent is null
        while (vertex != null) {
          path.push(vertex);
          vertex = spt[vertex].parent;
        }
      }
      return path.reverse();
    } else {
      throw new Error(`Vertex with name ${source} not found`);
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
          bfsResult.push(vertex.name);
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
