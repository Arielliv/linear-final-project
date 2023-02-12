// cliqueGraph experiments:
import {generalizedPowerIteration} from "../Utils/graphUtils";
import {algoRunParams} from "../types/types";
import {Delta_Values} from "../Constants/Constants";

export const PowerIterationRun = ({
                                      graph,
                                  }: algoRunParams) => {
    //3.
    // cliqueGraph experiments:
    // ringGraph experiments:
    // lollipopGraph experiments:
    // doubleCliqueLinkedByPathGraph experiments:
    for (const element of Delta_Values) {
        generalizedPowerIteration({graph, delta: element, kBiggestEigenvector: 0}).then((res) => {
            console.log(`cliqueGraph: first vector powerIteration result: ${res}\n`);
            console.log('\n');
        });
    }

    for (const element of Delta_Values) {
        generalizedPowerIteration({graph, delta: element, kBiggestEigenvector: 1}).then((res) => {
            console.log(`cliqueGraph: second vector powerIteration result: ${res}\n`);
            console.log('\n');
        });
    }
}