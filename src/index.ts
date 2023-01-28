import {createCliqueGraph} from "./Graphs/Clique";
import {createDoubleCliqueLinkedByPathGraph} from "./Graphs/DoubleCliqueLinkedByPath";
import {createRingGraph} from "./Graphs/Ring";
import {createLollipopGraph} from "./Graphs/Lollipop";
import {MAX_NUMBER} from "./Constants/Constants";
import {CoverTimeRun} from "./AlgorithemsRun/CoverTimeRun";
import {PageRankRun} from "./AlgorithemsRun/PageRankRun";
import {PowerIterationRun} from "./AlgorithemsRun/PowerIteration";


const cliqueGraph = createCliqueGraph(MAX_NUMBER);
const doubleCliqueLinkedByPathGraph = createDoubleCliqueLinkedByPathGraph(MAX_NUMBER);
const ringGraph = createRingGraph(MAX_NUMBER);
const lollipopGraph = createLollipopGraph(MAX_NUMBER);


//1.
CoverTimeRun({cliqueGraph, doubleCliqueLinkedByPathGraph, ringGraph, lollipopGraph})

//2
PageRankRun({cliqueGraph, doubleCliqueLinkedByPathGraph, ringGraph, lollipopGraph})

//3
PowerIterationRun({cliqueGraph, doubleCliqueLinkedByPathGraph, ringGraph, lollipopGraph});



