import {createCliqueGraph} from "./Graphs/Clique";
import {createDoubleCliqueLinkedByPathGraph} from "./Graphs/DoubleCliqueLinkedByPath";
import {createRingGraph} from "./Graphs/Ring";
import {createLollipopGraph} from "./Graphs/Lollipop";
import {MAX_NUMBER} from "./Constants/Constants";
import {
    arraysEqual, generalizedPowerIteration,
    getNormalAdjacencyMatrix,
    getStationaryProbabilityVector, matrixMulVector, pageRank, powerIteration,
    randomWalk, toFixVector
} from "./Utils/graphUtils";
import * as bigInt from "big-integer";


const cliqueGraph = createCliqueGraph(0, MAX_NUMBER);
const doubleCliqueLinkedByPathGraph = createDoubleCliqueLinkedByPathGraph(MAX_NUMBER);
const ringGraph = createRingGraph(0, MAX_NUMBER);
const lollipopGraph = createLollipopGraph(MAX_NUMBER);

// let sum = bigInt(0);
// let sum2 = bigInt(0);
// //1.
// // cliqueGraph experiments:
// console.log(`cliqueGraph:`);
// for (let i = 0; i < 10; i++) {
//     let result = randomWalk(cliqueGraph, 0);
//     sum = sum.add(result.coverTime);
//     console.log(`randomWalk (run number #${i}): ${result.coverTime}`);
//
// }
// console.log(`avg.: ${sum.divide(10)}\n`);
// sum = bigInt(0);
//
// // ringGraph experiments:
// console.log(`ringGraph`);
// for (let i = 0; i < 10; i++) {
//     let result = randomWalk(ringGraph, 0);
//     sum = sum.add(result.coverTime);
//     console.log(`randomWalk (run number #${i}): ${result.coverTime}`);
// }
//
// console.log(`avg.: ${sum.divide(10)}\n`);
// sum = bigInt(0);
//
// // lollipopGraph experiments:
// console.log(`lollipopGraph`);
// for (let i = 0; i < 10; i++) {
//     let result1 = randomWalk(lollipopGraph, 0);
//     let result2 = randomWalk(lollipopGraph, MAX_NUMBER - 1);
//     sum = sum.add(result1.coverTime);
//     sum2 = sum2.add(result2.coverTime)
//     console.log(`randomWalk (run number #${i}) when vertex is 0: ${result1.coverTime}`);
//     console.log(`randomWalk (run number #${i}) when vertex is ${MAX_NUMBER - 1}: ${result2.coverTime}`);
// }
// console.log(`avg.: ${sum.divide(10)}`);
// console.log(`avg.: ${sum2.divide(10)}\n`);
// sum = bigInt(0);
// sum2 = bigInt(0);
//
// // doubleCliqueLinkedByPathGraph experiments:
// console.log(`doubleCliqueLinkedByPathGraph`);
// for (let i = 0; i < 10; i++) {
//     let result1 = randomWalk(doubleCliqueLinkedByPathGraph, 0);
//     let result2 = randomWalk(doubleCliqueLinkedByPathGraph, MAX_NUMBER - 1);
//     sum = sum.add(result1.coverTime);
//     sum2 = sum2.add(result2.coverTime)
//     console.log(`randomWalk (run number #${i}) when vertex is 0: ${result1.coverTime}`);
//     console.log(`randomWalk (run number #${i}) when vertex is ${MAX_NUMBER - 1}: ${result2.coverTime}`);
// }
// console.log(`avg.: ${sum.divide(10)}`);
// console.log(`avg.: ${sum2.divide(10)}\n`);
// sum = bigInt(0);
// sum2 = bigInt(0);
//
//
// //2.a
// // cliqueGraph experiments:
// console.log('cliqueGraph:');
// console.log(`StationaryProbabilityVector: [${getStationaryProbabilityVector(getNormalAdjacencyMatrix(cliqueGraph))}]`);
// console.log(`StationaryProbabilityVector is eq: ${arraysEqual(matrixMulVector(getNormalAdjacencyMatrix(cliqueGraph), getStationaryProbabilityVector(getNormalAdjacencyMatrix(cliqueGraph))).getColumn(0), getStationaryProbabilityVector(getNormalAdjacencyMatrix(cliqueGraph)))}\n`);
//
// // ringGraph experiments:
// console.log('ringGraph:');
// console.log(`StationaryProbabilityVector: [${getStationaryProbabilityVector(getNormalAdjacencyMatrix(ringGraph))}]`);
// console.log(`StationaryProbabilityVector is eq: ${arraysEqual(matrixMulVector(getNormalAdjacencyMatrix(ringGraph), getStationaryProbabilityVector(getNormalAdjacencyMatrix(ringGraph))).getColumn(0), getStationaryProbabilityVector(getNormalAdjacencyMatrix(ringGraph)))}\n`);
//
// // lollipopGraph experiments:
// console.log('lollipopGraph:');
// console.log(`StationaryProbabilityVector: [${getStationaryProbabilityVector(getNormalAdjacencyMatrix(lollipopGraph))}]\n`);
// console.log(`StationaryProbabilityVector is eq: ${arraysEqual(toFixVector(matrixMulVector(getNormalAdjacencyMatrix(lollipopGraph), getStationaryProbabilityVector(getNormalAdjacencyMatrix(lollipopGraph))).getColumn(0)), getStationaryProbabilityVector(getNormalAdjacencyMatrix(lollipopGraph)))}\n`);
//
// // doubleCliqueLinkedByPathGraph experiments:
// console.log('doubleCliqueLinkedByPathGraph:');
// console.log(`StationaryProbabilityVector: [${getStationaryProbabilityVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph))}]\n`);
// console.log(`StationaryProbabilityVector is eq: ${arraysEqual(toFixVector(matrixMulVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph), getStationaryProbabilityVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph))).getColumn(0)), getStationaryProbabilityVector(getNormalAdjacencyMatrix(doubleCliqueLinkedByPathGraph)))}\n`);
//
//
// //2.b
// // cliqueGraph experiments:
// console.log('cliqueGraph:');
// pageRank({graph: cliqueGraph, vertex: 0, t: 1000000});
// console.log('\n');
//
// // ringGraph experiments:
// console.log('ringGraph:');
// pageRank({graph: ringGraph, vertex: 0, t: 1000000});
// console.log('\n');
//
// // lollipopGraph experiments:
// console.log('lollipopGraph:');
// pageRank({graph: lollipopGraph, vertex: 0, t: 1000000});
// console.log('\n');
// pageRank({graph: lollipopGraph, vertex: MAX_NUMBER - 1, t: 1000000});
// console.log('\n');
//
// // doubleCliqueLinkedByPathGraph experiments:
// console.log('doubleCliqueLinkedByPathGraph:');
// pageRank({graph: doubleCliqueLinkedByPathGraph, vertex: 0, t: 1000000});
// console.log('\n');
// pageRank({graph: doubleCliqueLinkedByPathGraph, vertex: MAX_NUMBER - 1, t: 1000000});
// console.log('\n');
//

//3
// cliqueGraph experiments:
console.log('cliqueGraph:');
generalizedPowerIteration({graph: cliqueGraph, delta: 0.0001, kBiggestEigenvector: 1}).then((res) => {
    console.log(`powerIteration result: ${res}`);
});
console.log('\n');

// // ringGraph experiments:
// console.log('ringGraph:');
// console.log(`powerIteration result: ${powerIteration({graph: ringGraph, delta: 0.25, t: 1000000})}`);
// console.log('\n');
//
// lollipopGraph experiments:
// console.log('lollipopGraph:');
// generalizedPowerIteration({
//     graph: lollipopGraph,
//     delta: 0.25,
//     t: 1000000
// }).then((res) => {
//     console.log(`powerIteration result: ${res}`);
// })
// console.log('\n');
//
// // doubleCliqueLinkedByPathGraph experiments:
// console.log('doubleCliqueLinkedByPathGraph:');
// console.log(`powerIteration result: ${powerIteration({
//     graph: doubleCliqueLinkedByPathGraph,
//     delta: 0.25,
//     t: 1000000
// })}`);
// console.log('\n');


