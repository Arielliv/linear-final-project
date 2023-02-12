import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
import {createClique, creatPath} from "../Utils/graphUtils";


export const createLollipopGraph = (n: number) => {
    console.log('creating LollipopGraph...');
    let graph = new CompactAdjacencyMatrix(n);
    const pathLimit = Math.floor(n / 2);

    const firstNodeOfFirstClique = pathLimit;
    const firstCliqueLimit = n;

    graph = creatPath(graph, 0, pathLimit);
    graph = createClique(graph, firstNodeOfFirstClique, firstCliqueLimit);

    graph.addEdge(pathLimit - 1, firstNodeOfFirstClique);
    graph.addEdge(firstNodeOfFirstClique, pathLimit - 1);


    // works the same
    // for (let i = 0; i < n; i++) {
    //     for (let j = 0; j < n; j++) {
    //         if ((i + 1 === j) || (i === j + 1) || (i === j) || (i >= firstNodeOfFirstClique && j >= firstNodeOfFirstClique)) {
    //             graph.addEdge(i, j);
    //         }
    //
    //     }
    // }
    return graph;
}
