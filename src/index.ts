import {createCliqueGraph} from "./Graphs/Clique";
import {createDoubleCliqueLinkedByPathGraph} from "./Graphs/DoubleCliqueLinkedByPath";
import {createRingGraph} from "./Graphs/Ring";
import {createLollipopGraph} from "./Graphs/Lollipop";
import {MAX_NUMBER} from "./Constants/Constants";
import {
    arraysEqual,
    getNormalAdjacencyMatrix,
    getStationaryProbabilityVector, matrixMulVector,
    randomWalk, toFixVector
} from "./Utils/graphUtils";


const cliqueGraph = createCliqueGraph(0, MAX_NUMBER);
const doubleCliqueLinkedByPathGraph = createDoubleCliqueLinkedByPathGraph(MAX_NUMBER);
const ringGraph = createRingGraph(0, MAX_NUMBER);
const lollipopGraph = createLollipopGraph(MAX_NUMBER);

//1.
// cliqueGraph experiments:
console.log(`randomWalk of cliqueGraph: ${randomWalk(cliqueGraph, 0)}\n`);

// ringGraph experiments:
console.log(`randomWalk of ringGraph when vertex is 0: ${randomWalk(ringGraph, 0)}\n`);

// lollipopGraph experiments:
console.log(`randomWalk of lollipopGraph when vertex is 0: ${randomWalk(lollipopGraph, 0)}\n`);
console.log(`randomWalk of lollipopGraph when vertex is ${MAX_NUMBER - 1}: ${randomWalk(lollipopGraph, MAX_NUMBER - 1)}\n`);

// doubleCliqueLinkedByPathGraph experiments:
console.log(`randomWalk of doubleCliqueLinkedByPathGraph when vertex is 0: ${randomWalk(doubleCliqueLinkedByPathGraph, 0)}\n`);
console.log(`randomWalk of doubleCliqueLinkedByPathGraph when vertex is ${MAX_NUMBER - 1}: ${randomWalk(doubleCliqueLinkedByPathGraph, MAX_NUMBER - 1)}\n`);

// //2.
// cliqueGraph experiments:
console.log('cliqueGraph:');
console.log(`StationaryProbabilityVector: [${getStationaryProbabilityVector(getNormalAdjacencyMatrix(cliqueGraph))}]`);
console.log(`StationaryProbabilityVector is eq: ${arraysEqual(matrixMulVector(getNormalAdjacencyMatrix(cliqueGraph), getStationaryProbabilityVector(getNormalAdjacencyMatrix(cliqueGraph))).getColumn(0), getStationaryProbabilityVector(getNormalAdjacencyMatrix(cliqueGraph)))}\n`);

// ringGraph experiments:
console.log('ringGraph:');
console.log(`StationaryProbabilityVector: [${getStationaryProbabilityVector(getNormalAdjacencyMatrix(ringGraph))}]`);
console.log(`StationaryProbabilityVector is eq: ${arraysEqual(matrixMulVector(getNormalAdjacencyMatrix(ringGraph), getStationaryProbabilityVector(getNormalAdjacencyMatrix(ringGraph))).getColumn(0), getStationaryProbabilityVector(getNormalAdjacencyMatrix(ringGraph)))}\n`);

// doubleCliqueLinkedByPathGraph experiments:
console.log('doubleCliqueLinkedByPathGraph:');
console.log(`StationaryProbabilityVector: [${getStationaryProbabilityVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph))}]\n`);
console.log(`StationaryProbabilityVector is eq: ${arraysEqual(toFixVector(matrixMulVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph), getStationaryProbabilityVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph))).getColumn(0)), getStationaryProbabilityVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph)))}\n`);

// lollipopGraph experiments:
console.log('lollipopGraph:');
console.log(`StationaryProbabilityVector: [${getStationaryProbabilityVector(getNormalAdjacencyMatrix(lollipopGraph))}]\n`);
console.log(`StationaryProbabilityVector is eq: ${arraysEqual(toFixVector(matrixMulVector(getNormalAdjacencyMatrix(lollipopGraph), getStationaryProbabilityVector(getNormalAdjacencyMatrix(lollipopGraph))).getColumn(0)), getStationaryProbabilityVector(getNormalAdjacencyMatrix(lollipopGraph)))}\n`);
