// cliqueGraph experiments:
import {generalizedPowerIteration} from "../Utils/graphUtils";
import {algoRunParams} from "../types/types";

export const PowerIterationRun = ({
                                      cliqueGraph,
                                      ringGraph,
                                      lollipopGraph,
                                      doubleCliqueLinkedByPathGraph
                                  }: algoRunParams) => {
    //3.
    generalizedPowerIteration({graph: cliqueGraph, delta: 0.25, kBiggestEigenvector: 0}).then((res) => {
        console.log(`cliqueGraph: powerIteration result: ${res}`);
        console.log('\n');
    });


// ringGraph experiments:
    generalizedPowerIteration({graph: ringGraph, delta: 0.25, kBiggestEigenvector: 0}).then((res) => {
        console.log(`ringGraph: powerIteration result: ${res}`);
        console.log('\n');
    });


// lollipopGraph experiments:
    generalizedPowerIteration({graph: lollipopGraph, delta: 0.25, kBiggestEigenvector: 0}).then((res) => {
        console.log(`lollipopGraph: powerIteration result: ${res}`);
        console.log('\n');
    });


// doubleCliqueLinkedByPathGraph experiments:
    generalizedPowerIteration({
        graph: doubleCliqueLinkedByPathGraph,
        delta: 0.25,
        kBiggestEigenvector: 0
    }).then((res) => {
        console.log(`doubleCliqueLinkedByPathGraph: powerIteration result: ${res}`);
        console.log('\n');
    });

}