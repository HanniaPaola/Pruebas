import Graph from "../models/Graph.mjs";

let g = new Graph();
g.addVertices("A", "B", "C", "D", "E", "F", "G");
g.addV("H");
g.addV("I");

g.addConexion("A", "B");
g.addConexion("A", "C");
g.addConexion("A", "D", 8);
g.addConexion("B", "E", 9);
g.addConexion("B", "F", 10);
g.addConexion("D", "F", 11);
g.addConexion("E", "G", 12);
g.addConexion("G", "H");
g.addConexion("G", "I");

const callback = (val) => {
    console.log(val);
};
g.bfs(callback);

export function addConexion(start, end, weight) {
    g.addConexion(start, end, weight);
}

export function bfs(callback) {
    g.bfs(callback);
}

export function dfs(start) {
    return g.dfs(start);
}

export function shortestPath(start, end) {
    return g.shortestPath(start, end);
}



