// @ts-ignore
import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
import {createClique, creatPath} from "../Utils/graphUtils";

export const createDoubleCliqueLinkedByPathGraph = (n: number) => {
    let graph = new CompactAdjacencyMatrix(n);
    const pathLimit = Math.floor(n / 2);

    const firstNodeOfFirstClique = pathLimit;
    const firstCliqueLimit = ((Math.floor(n / 4) * 3));

    const firstNodeOfSecondClique = firstCliqueLimit;
    const secondCliqueLimit = n;

    graph = creatPath(graph, 0, pathLimit);
    graph = createClique(graph, firstNodeOfFirstClique, firstCliqueLimit);
    graph = createClique(graph, firstNodeOfSecondClique, secondCliqueLimit);

    graph.addEdge(0, firstNodeOfFirstClique);
    graph.addEdge(firstNodeOfFirstClique, 0);

    graph.addEdge(pathLimit - 1, firstNodeOfSecondClique);
    graph.addEdge(firstNodeOfSecondClique, pathLimit - 1);

    return graph;
}
