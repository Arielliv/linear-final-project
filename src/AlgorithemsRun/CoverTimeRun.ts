import {randomWalk} from "../Utils/graphUtils";
import * as bigInt from "big-integer";
import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
import {MAX_NUMBER} from "../Constants/Constants";
import {algoRunParams} from "../types/types";


export const CoverTimeRun = ({
                                 cliqueGraph,
                                 ringGraph,
                                 lollipopGraph,
                                 doubleCliqueLinkedByPathGraph
                             }: algoRunParams): void => {
    let sum = bigInt(0);
    let sum2 = bigInt(0);
//1.
// cliqueGraph experiments:
    console.log(`cliqueGraph:`);
    for (let i = 0; i < 10; i++) {
        let result = randomWalk(cliqueGraph, 0);
        sum = sum.add(result.coverTime);
        console.log(`randomWalk (run number #${i}): ${result.coverTime}`);

    }
    console.log(`avg.: ${sum.divide(10)}\n`);
    sum = bigInt(0);

// ringGraph experiments:
    console.log(`ringGraph`);
    for (let i = 0; i < 10; i++) {
        let result = randomWalk(ringGraph, 0);
        sum = sum.add(result.coverTime);
        console.log(`randomWalk (run number #${i}): ${result.coverTime}`);
    }

    console.log(`avg.: ${sum.divide(10)}\n`);
    sum = bigInt(0);

// lollipopGraph experiments:
    console.log(`lollipopGraph`);
    for (let i = 0; i < 10; i++) {
        let result1 = randomWalk(lollipopGraph, 0);
        let result2 = randomWalk(lollipopGraph, MAX_NUMBER - 1);
        sum = sum.add(result1.coverTime);
        sum2 = sum2.add(result2.coverTime)
        console.log(`randomWalk (run number #${i}) when vertex is 0: ${result1.coverTime}`);
        console.log(`randomWalk (run number #${i}) when vertex is ${MAX_NUMBER - 1}: ${result2.coverTime}`);
    }
    console.log(`avg.: ${sum.divide(10)}`);
    console.log(`avg.: ${sum2.divide(10)}\n`);
    sum = bigInt(0);
    sum2 = bigInt(0);

// doubleCliqueLinkedByPathGraph experiments:
    console.log(`doubleCliqueLinkedByPathGraph`);
    for (let i = 0; i < 10; i++) {
        let result1 = randomWalk(doubleCliqueLinkedByPathGraph, 0);
        let result2 = randomWalk(doubleCliqueLinkedByPathGraph, MAX_NUMBER - 1);
        sum = sum.add(result1.coverTime);
        sum2 = sum2.add(result2.coverTime)
        console.log(`randomWalk (run number #${i}) when vertex is 0: ${result1.coverTime}`);
        console.log(`randomWalk (run number #${i}) when vertex is ${MAX_NUMBER - 1}: ${result2.coverTime}`);
    }
    console.log(`avg.: ${sum.divide(10)}`);
    console.log(`avg.: ${sum2.divide(10)}\n`);
    sum = bigInt(0);
    sum2 = bigInt(0);
}
