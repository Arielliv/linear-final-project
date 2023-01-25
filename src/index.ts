import {createCliqueGraph} from "./Graphs/Clique";
import {createDoubleCliqueLinkedByPathGraph} from "./Graphs/DoubleCliqueLinkedByPath";
import {createRingGraph} from "./Graphs/Ring";
import {createLollipopGraph} from "./Graphs/Lollipop";
import {MAX_NUMBER} from "./Constants/Constants";
import {randomWalk} from "./Utils/graphUtils";


const cliqueGraph = createCliqueGraph(0, MAX_NUMBER);
const doubleCliqueLinkedByPathGraph = createDoubleCliqueLinkedByPathGraph(MAX_NUMBER);
const ringGraph = createRingGraph(0, MAX_NUMBER);
const lollipopGraph = createLollipopGraph(MAX_NUMBER);

console.log(doubleCliqueLinkedByPathGraph.edges());