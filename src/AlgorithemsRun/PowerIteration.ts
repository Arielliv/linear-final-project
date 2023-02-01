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
            console.log(`cliqueGraph: powerIteration result: ${res}`);
            console.log('\n');
        });
    }
}