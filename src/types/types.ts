import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";

export interface algoRunParams {
    cliqueGraph: CompactAdjacencyMatrix,
    ringGraph: CompactAdjacencyMatrix,
    lollipopGraph: CompactAdjacencyMatrix,
    doubleCliqueLinkedByPathGraph: CompactAdjacencyMatrix
}