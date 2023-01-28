import {createCliqueGraph} from "./Graphs/Clique";
import {createDoubleCliqueLinkedByPathGraph} from "./Graphs/DoubleCliqueLinkedByPath";
import {createRingGraph} from "./Graphs/Ring";
import {createLollipopGraph} from "./Graphs/Lollipop";
import {MAX_NUMBER} from "./Constants/Constants";
import {
    generalizedPowerIteration,
    getNormalAdjacencyMatrix,
    getStationaryProbabilityVector, matrixMulVector, pageRank, powerIteration,
    randomWalk, toFixVector
} from "./Utils/graphUtils";
import * as bigInt from "big-integer";
import {PageRankRun} from "./AlgorithemsRun/PageRankRun";
import {CoverTimeRun} from "./AlgorithemsRun/CoverTimeRun";


const cliqueGraph = createCliqueGraph(0, MAX_NUMBER);
const doubleCliqueLinkedByPathGraph = createDoubleCliqueLinkedByPathGraph(MAX_NUMBER);
const ringGraph = createRingGraph(0, MAX_NUMBER);
const lollipopGraph = createLollipopGraph(MAX_NUMBER);


// //1.
// CoverTimeRun({cliqueGraph, doubleCliqueLinkedByPathGraph, ringGraph, lollipopGraph})
// //2.a
// PageRankRun({cliqueGraph, doubleCliqueLinkedByPathGraph, ringGraph, lollipopGraph})

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


