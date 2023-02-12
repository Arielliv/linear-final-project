import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";

export const createRingGraph = (n: number, offset = 0) => {
    console.log('creating RingGraph...');
    const graph = new CompactAdjacencyMatrix(n);
    for (let i = offset; i < n; i++) {
        for (let j = offset; j < n; j++) {
            if ((i === j) || ((i + 1) % n === j) || (i === (j + 1) % n)) {
                graph.addEdge(i, j);
            }
        }
    }

    return graph;
}