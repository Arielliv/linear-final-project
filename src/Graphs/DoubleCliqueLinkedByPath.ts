// @ts-ignore
import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
// import {createClique, creatPath} from "../Utils/graphUtils";

export const createDoubleCliqueLinkedByPathGraph = (n: number) => {
    console.log('creating DoubleCliqueLinkedByPathGraph');
    let graph = new CompactAdjacencyMatrix(n);
    const pathLimit = Math.floor(n / 2);

    const firstNodeOfFirstClique = pathLimit;
    const firstCliqueLimit = ((Math.floor(n / 4) * 3));

    const firstNodeOfSecondClique = firstCliqueLimit;

    //todo: need to check whats missing

    // const secondCliqueLimit = n;
    //
    // graph = creatPath(graph, 0, pathLimit);
    // graph = createClique(graph, firstNodeOfFirstClique, firstCliqueLimit);
    // graph = createClique(graph, firstNodeOfSecondClique, secondCliqueLimit);
    //
    // graph.addEdge(0, firstNodeOfFirstClique);
    // graph.addEdge(firstNodeOfFirstClique, 0);
    //
    // graph.addEdge(pathLimit - 1, firstNodeOfSecondClique);
    // graph.addEdge(firstNodeOfSecondClique, pathLimit - 1);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if ((i + 1 === j || i === j + 1 || i === j || (i >= firstNodeOfFirstClique && j >= firstNodeOfFirstClique) || (i >= firstNodeOfSecondClique && j >= firstNodeOfSecondClique))) {
                graph.addEdge(i, j);
            }
        }
    }

    return graph;
}
