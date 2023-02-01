import {
    getNormalAdjacencyMatrix,
    getStationaryProbabilityVector,
    pageRank, stationaryProbabilityVectorCheck, toFixVector
} from "../Utils/graphUtils";

import {MAX_NUMBER} from "../Constants/Constants";
import {algoRunParams} from "../types/types";

export const PageRankRun = ({
                                graph,
                                graphIndex
                            }: algoRunParams) => {
    let normalAdjacencyMatrix;
    let StationaryProbabilityVector;

//2.a
    // cliqueGraph experiments:
    // ringGraph experiments:
    // lollipopGraph experiments:
    // doubleCliqueLinkedByPathGraph experiments:
    if (graphIndex === 0) {
        console.log('cliqueGraph:');
    } else if (graphIndex === 1) {
        console.log('ringGraph:');
    } else if (graphIndex === 2) {
        console.log('lollipopGraph:');
    } else if (graphIndex === 3) {
        console.log('doubleCliqueLinkedByPathGraph:');
    }


    normalAdjacencyMatrix = getNormalAdjacencyMatrix(graph);
    StationaryProbabilityVector = getStationaryProbabilityVector(normalAdjacencyMatrix);

    console.log(`StationaryProbabilityVector, with size: ${StationaryProbabilityVector.length} , [${StationaryProbabilityVector}]`);
    console.log(`StationaryProbabilityVector is eq: ${stationaryProbabilityVectorCheck(normalAdjacencyMatrix, StationaryProbabilityVector)}\n`);

//2.b
    // cliqueGraph experiments:
    // ringGraph experiments:
    // lollipopGraph experiments:
    // doubleCliqueLinkedByPathGraph experiments:
    if (graphIndex === 0) {
        console.log('cliqueGraph:');
    } else if (graphIndex === 1) {
        console.log('ringGraph:');
    } else if (graphIndex === 2) {
        console.log('lollipopGraph:');
    } else if (graphIndex === 3) {
        console.log('doubleCliqueLinkedByPathGraph:');
    }

    if (graphIndex === 0 || graphIndex === 1) {
        // cliqueGraph experiments:
        // ringGraph experiments:
        pageRank({graph, vertex: 0, t: 10000});

        console.log('\n');

    } else if (graphIndex === 2 || graphIndex === 3) {
        pageRank({graph, vertex: 0, t: 10000});
        console.log('\n');
        pageRank({graph, vertex: MAX_NUMBER - 1, t: 10000});
    }
}