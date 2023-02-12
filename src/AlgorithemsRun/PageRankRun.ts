import {
    getNormalAdjacencyMatrix,
    pageRank, stationaryProbabilityVectorCheck, getStationaryProbabilityVector
} from "../Utils/graphUtils";

import {MAX_NUMBER} from "../Constants/Constants";
import {algoRunParams} from "../types/types";

export const PageRankRun = ({
                                graph,
                                graphIndex
                            }: algoRunParams) => {
    let normalAdjacencyMatrix;
    let stationaryProbabilityVector;

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
    stationaryProbabilityVector = getStationaryProbabilityVector(graph, normalAdjacencyMatrix, graphIndex);

    console.log(`StationaryProbabilityVector, with size: ${stationaryProbabilityVector.length} , [${stationaryProbabilityVector}]\n`);
    console.log(`StationaryProbabilityVector is eq: ${stationaryProbabilityVectorCheck(normalAdjacencyMatrix, stationaryProbabilityVector)}\n`);

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
        pageRank({graph, vertex: 0, t: 100000, stationaryProbabilityVector});

        console.log('\n');

    } else if (graphIndex === 2 || graphIndex === 3) {
        pageRank({graph, vertex: 0, t: 100000, stationaryProbabilityVector});
        console.log('\n');
        pageRank({graph, vertex: MAX_NUMBER - 1, t: 100000, stationaryProbabilityVector});
    }
}