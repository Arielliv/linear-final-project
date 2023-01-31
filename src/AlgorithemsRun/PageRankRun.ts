import {
    getNormalAdjacencyMatrix,
    getStationaryProbabilityVector,
    pageRank, stationaryProbabilityVectorCheck, toFixVector
} from "../Utils/graphUtils";

import {MAX_NUMBER} from "../Constants/Constants";
import {algoRunParams} from "../types/types";
import {arraysEqual} from "../Utils/utils";
import {matrixMulVector} from "../Utils/linearUtils";

export const PageRankRun = ({
                                cliqueGraph,
                                ringGraph,
                                lollipopGraph,
                                doubleCliqueLinkedByPathGraph
                            }: algoRunParams) => {
    let normalAdjacencyMatrix;
    let StationaryProbabilityVector;
    let checkVector;
//2.a
// cliqueGraph experiments:
//     console.log('cliqueGraph:');

    // normalAdjacencyMatrix = getNormalAdjacencyMatrix(cliqueGraph);
    // StationaryProbabilityVector = getStationaryProbabilityVector(normalAdjacencyMatrix);

    // console.log(`StationaryProbabilityVector, with size: ${StationaryProbabilityVector.length} , [${StationaryProbabilityVector}]`);
    // console.log(`StationaryProbabilityVector is eq: ${stationaryProbabilityVectorCheck(normalAdjacencyMatrix,StationaryProbabilityVector )}\n`);

// ringGraph experiments:
//     console.log('ringGraph:');

    // normalAdjacencyMatrix = getNormalAdjacencyMatrix(ringGraph);
    // StationaryProbabilityVector = getStationaryProbabilityVector(normalAdjacencyMatrix);

    // console.log(`StationaryProbabilityVector, with size: ${StationaryProbabilityVector.length} , [${StationaryProbabilityVector}]`);
    // console.log(`StationaryProbabilityVector is eq: ${stationaryProbabilityVectorCheck(normalAdjacencyMatrix,StationaryProbabilityVector )}\n`);

// lollipopGraph experiments:
//     console.log('lollipopGraph:');

    // normalAdjacencyMatrix = getNormalAdjacencyMatrix(lollipopGraph);
    // StationaryProbabilityVector = getStationaryProbabilityVector(normalAdjacencyMatrix);

    // console.log(`StationaryProbabilityVector, with size: ${StationaryProbabilityVector.length} , [${StationaryProbabilityVector}]`);
    // console.log(`StationaryProbabilityVector is eq: ${stationaryProbabilityVectorCheck(normalAdjacencyMatrix,StationaryProbabilityVector )}\n`);

// doubleCliqueLinkedByPathGraph experiments:
//     console.log('doubleCliqueLinkedByPathGraph:');

    // normalAdjacencyMatrix = getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph);
    // StationaryProbabilityVector = getStationaryProbabilityVector(normalAdjacencyMatrix);

    // console.log(`StationaryProbabilityVector, with size: ${StationaryProbabilityVector.length} , [${StationaryProbabilityVector}]`);
    // console.log(`StationaryProbabilityVector is eq: ${stationaryProbabilityVectorCheck(normalAdjacencyMatrix,StationaryProbabilityVector )}\n`);

//2.b
// cliqueGraph experiments:
    console.log('cliqueGraph:');

    pageRank({graph: cliqueGraph, vertex: 0, t: 10000});

    console.log('\n');

// ringGraph experiments:
    console.log('ringGraph:');

    pageRank({graph: ringGraph, vertex: 0, t: 10000});

    console.log('\n');

// lollipopGraph experiments:
    console.log('lollipopGraph:');

    pageRank({graph: lollipopGraph, vertex: 0, t: 10000});

    console.log('\n');

    pageRank({graph: lollipopGraph, vertex: MAX_NUMBER - 1, t: 10000});

    console.log('\n');

// doubleCliqueLinkedByPathGraph experiments:
    console.log('doubleCliqueLinkedByPathGraph:');

    pageRank({graph: doubleCliqueLinkedByPathGraph, vertex: 0, t: 10000});

    console.log('\n');

    pageRank({graph: doubleCliqueLinkedByPathGraph, vertex: MAX_NUMBER - 1, t: 10000});

    console.log('\n');

}