import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
import {createClique} from "../Utils/graphUtils";


export const createCliqueGraph = (n: number, offset = 0) => {
    let graph = new CompactAdjacencyMatrix(n);

    graph = createClique(graph, 0, n);
    return graph;


}