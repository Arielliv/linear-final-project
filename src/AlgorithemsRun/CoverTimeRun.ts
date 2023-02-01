import {randomWalk} from "../Utils/graphUtils";
import * as bigInt from "big-integer";
import {MAX_NUMBER} from "../Constants/Constants";
import {algoRunParams} from "../types/types";


export const CoverTimeRun = ({
                                 graph,
                                 graphIndex,
                             }: algoRunParams): void => {
    let sum = bigInt(0);
    let sum2 = bigInt(0);

    //1.
    if (graphIndex === 0 || graphIndex === 1) {
        // cliqueGraph experiments:
        // ringGraph experiments:
        console.log(graphIndex === 0 ? `cliqueGraph:` : `ringGraph:`);
        for (let i = 0; i < 10; i++) {
            let result = randomWalk(graph, 0);
            sum = sum.add(result.coverTime);
            console.log(`randomWalk (run number #${i}): ${result.coverTime}`);

        }
        console.log(`avg.: ${sum.divide(10)}\n`);
        sum = bigInt(0);
    } else if (graphIndex === 2 || graphIndex === 3) {
        // lollipopGraph experiments:
        // doubleCliqueLinkedByPathGraph experiments:
        console.log(graphIndex === 2 ? `lollipopGraph:` : `doubleCliqueLinkedByPathGraph:`);
        for (let i = 0; i < 10; i++) {
            let result1 = randomWalk(graph, 0);
            let result2 = randomWalk(graph, MAX_NUMBER - 1);
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
}
