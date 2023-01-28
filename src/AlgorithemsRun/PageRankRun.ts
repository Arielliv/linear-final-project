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
    console.log(`StationaryProbabilityVector: [${getStationaryProbabilityVector(getNormalAdjacencyMatrix(cliqueGraph))}]`);
    console.log(`StationaryProbabilityVector is eq: ${arraysEqual(matrixMulVector(getNormalAdjacencyMatrix(cliqueGraph), getStationaryProbabilityVector(getNormalAdjacencyMatrix(cliqueGraph))).getColumn(0), getStationaryProbabilityVector(getNormalAdjacencyMatrix(cliqueGraph)))}\n`);

// ringGraph experiments:
    console.log('ringGraph:');
    console.log(`StationaryProbabilityVector: [${getStationaryProbabilityVector(getNormalAdjacencyMatrix(ringGraph))}]`);
    console.log(`StationaryProbabilityVector is eq: ${arraysEqual(matrixMulVector(getNormalAdjacencyMatrix(ringGraph), getStationaryProbabilityVector(getNormalAdjacencyMatrix(ringGraph))).getColumn(0), getStationaryProbabilityVector(getNormalAdjacencyMatrix(ringGraph)))}\n`);

// lollipopGraph experiments:
    console.log('lollipopGraph:');
    console.log(`StationaryProbabilityVector: [${getStationaryProbabilityVector(getNormalAdjacencyMatrix(lollipopGraph))}]\n`);
    console.log(`StationaryProbabilityVector is eq: ${arraysEqual(toFixVector(matrixMulVector(getNormalAdjacencyMatrix(lollipopGraph), getStationaryProbabilityVector(getNormalAdjacencyMatrix(lollipopGraph))).getColumn(0)), getStationaryProbabilityVector(getNormalAdjacencyMatrix(lollipopGraph)))}\n`);

// doubleCliqueLinkedByPathGraph experiments:
    console.log('doubleCliqueLinkedByPathGraph:');
    console.log(`StationaryProbabilityVector: [${getStationaryProbabilityVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph))}]\n`);
    console.log(`StationaryProbabilityVector is eq: ${arraysEqual(toFixVector(matrixMulVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph), getStationaryProbabilityVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph))).getColumn(0)), getStationaryProbabilityVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph)))}\n`);


//2.b
// cliqueGraph experiments:
    console.log('cliqueGraph:');
    pageRank({graph: cliqueGraph, vertex: 0, t: 1000000});
    console.log('\n');

// ringGraph experiments:
    console.log('ringGraph:');
    pageRank({graph: ringGraph, vertex: 0, t: 1000000});
    console.log('\n');

// lollipopGraph experiments:
    console.log('lollipopGraph:');
    pageRank({graph: lollipopGraph, vertex: 0, t: 1000000});
    console.log('\n');
    pageRank({graph: lollipopGraph, vertex: MAX_NUMBER - 1, t: 1000000});
    console.log('\n');

// doubleCliqueLinkedByPathGraph experiments:
    console.log('doubleCliqueLinkedByPathGraph:');
    pageRank({graph: doubleCliqueLinkedByPathGraph, vertex: 0, t: 1000000});
    console.log('\n');
    pageRank({graph: doubleCliqueLinkedByPathGraph, vertex: MAX_NUMBER - 1, t: 1000000});
    console.log('\n');

}