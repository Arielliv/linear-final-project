import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
import {createClique, creatPath} from "../Utils/graphUtils";


export const createLollipopGraph = (n: number) => {
    let graph = new CompactAdjacencyMatrix(n);
    const pathLimit = Math.floor(n / 2);

    const firstNodeOfFirstClique = pathLimit;
    const firstCliqueLimit = n;

    graph = creatPath(graph, 0, pathLimit);
    graph = createClique(graph, firstNodeOfFirstClique, firstCliqueLimit);

    graph.addEdge(pathLimit - 1, firstNodeOfFirstClique);
    graph.addEdge(firstNodeOfFirstClique, pathLimit - 1);

    return graph;
}
