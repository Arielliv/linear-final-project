import {
    getNormalAdjacencyMatrix,
    getStationaryProbabilityVector,
    matrixMulVector, pageRank, toFixVector
} from "../Utils/graphUtils";

import {MAX_NUMBER} from "../Constants/Constants";
import {algoRunParams} from "../types/types";
import {arraysEqual} from "../Utils/utils";

export const PageRankRun = ({
                                cliqueGraph,
                                ringGraph,
                                lollipopGraph,
                                doubleCliqueLinkedByPathGraph
                            }: algoRunParams) => {
//2.a
// cliqueGraph experiments:
    console.log('cliqueGraph:');
    let StationaryProbabilityVector = getStationaryProbabilityVector(getNormalAdjacencyMatrix(cliqueGraph));
    let checkVector = matrixMulVector(getNormalAdjacencyMatrix(cliqueGraph), StationaryProbabilityVector).getColumn(0);
    console.log(`StationaryProbabilityVector, with size: ${StationaryProbabilityVector.length} , [${StationaryProbabilityVector}]`);
    console.log(`StationaryProbabilityVector is eq: ${arraysEqual(checkVector, StationaryProbabilityVector)}\n`);

// ringGraph experiments:
    console.log('ringGraph:');
    StationaryProbabilityVector = getStationaryProbabilityVector(getNormalAdjacencyMatrix(ringGraph));
    checkVector = matrixMulVector(getNormalAdjacencyMatrix(ringGraph), StationaryProbabilityVector).getColumn(0);
    console.log(`StationaryProbabilityVector, with size: ${StationaryProbabilityVector.length} , [${StationaryProbabilityVector}]`);
    console.log(`StationaryProbabilityVector is eq: ${arraysEqual(checkVector, StationaryProbabilityVector)}\n`);

// lollipopGraph experiments:
    console.log('lollipopGraph:');
    StationaryProbabilityVector = getStationaryProbabilityVector(getNormalAdjacencyMatrix(ringGraph));
    checkVector = matrixMulVector(getNormalAdjacencyMatrix(lollipopGraph), StationaryProbabilityVector).getColumn(0);
    console.log(`StationaryProbabilityVector, with size: ${StationaryProbabilityVector.length} , [${StationaryProbabilityVector}]`);
    console.log(`StationaryProbabilityVector is eq: ${arraysEqual(toFixVector(checkVector), StationaryProbabilityVector)}\n`);

// doubleCliqueLinkedByPathGraph experiments:
    console.log('doubleCliqueLinkedByPathGraph:');
    StationaryProbabilityVector = getStationaryProbabilityVector(getNormalAdjacencyMatrix(ringGraph));
    checkVector = matrixMulVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph), StationaryProbabilityVector).getColumn(0);
    console.log(`StationaryProbabilityVector, with size: ${StationaryProbabilityVector.length} , [${StationaryProbabilityVector}]`);
    console.log(`StationaryProbabilityVector is eq: ${arraysEqual(toFixVector(checkVector), StationaryProbabilityVector)}\n`);


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