// cliqueGraph experiments:
import {generalizedPowerIteration} from "../Utils/graphUtils";
import {algoRunParams} from "../types/types";
import {Delta_Values} from "../Constants/Constants";

export const PowerIterationRun = ({
                                      cliqueGraph,
                                      ringGraph,
                                      lollipopGraph,
                                      doubleCliqueLinkedByPathGraph
                                  }: algoRunParams) => {
    //3.
    for (const element of Delta_Values) {
        generalizedPowerIteration({graph: cliqueGraph, delta: element, kBiggestEigenvector: 0}).then((res) => {
            console.log(`cliqueGraph: powerIteration result: ${res}`);
            console.log('\n');
        });


// ringGraph experiments:
        generalizedPowerIteration({graph: ringGraph, delta: element, kBiggestEigenvector: 0}).then((res) => {
            console.log(`ringGraph: powerIteration result: ${res}`);
            console.log('\n');
        });


// lollipopGraph experiments:
        generalizedPowerIteration({
            graph: lollipopGraph,
            delta: element,
            kBiggestEigenvector: 0
        }).then((res) => {
            console.log(`lollipopGraph: powerIteration result: ${res}`);
            console.log('\n');
        });


// doubleCliqueLinkedByPathGraph experiments:
        generalizedPowerIteration({
            graph: doubleCliqueLinkedByPathGraph,
            delta: element,
            kBiggestEigenvector: 0
        }).then((res) => {
            console.log(`doubleCliqueLinkedByPathGraph: powerIteration result: ${res}`);
            console.log('\n');
        });
    }
}