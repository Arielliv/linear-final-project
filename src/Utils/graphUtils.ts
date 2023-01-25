import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
import _ from "lodash";

export const createClique = (graph: CompactAdjacencyMatrix, offset: number, n: number) => {
    for (let i = offset; i < n; i++) {
        for (let y = offset; y < n; y++) {
            graph.addEdge(i, y);
            graph.addEdge(y, i);
        }
    }
    return graph;
}

export const creatPath = (graph: CompactAdjacencyMatrix, offset: number, n: number) => {
    for (let i = offset; i < n - 1; i++) {
        graph.addEdge(i, i + 1);
        graph.addEdge(i + 1, i);
        graph.addEdge(i, i);
    }
    graph.addEdge(n - 1, n - 1);

    return graph;
}

export const randomWalk = (graph: CompactAdjacencyMatrix, vertex: number) => {

}