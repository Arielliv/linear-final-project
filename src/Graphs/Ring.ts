import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";

export const createRingGraph = (offset: number, n: number) => {
    let graph = new CompactAdjacencyMatrix(n);
    for (let i = offset; i < n - 1; i++) {
        graph.addEdge(i, Math.floor((i + 1) % n));
        graph.addEdge(i, Math.floor((i - 1 + n) % n));
        graph.addEdge(i, i);
    }
    graph.addEdge(n - 1, n - 1);
    graph.addEdge(n - 1, n - 2);
    graph.addEdge(n - 1, 0);
    return graph;
}