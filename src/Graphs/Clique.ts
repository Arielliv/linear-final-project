import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
import {createClique} from "../Utils/graphUtils";


export const createCliqueGraph = (offset: number, n: number) => {
    let graph = new CompactAdjacencyMatrix(n);

    graph = createClique(graph, 0, n);
    return graph;


}