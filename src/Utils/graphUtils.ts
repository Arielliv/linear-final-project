import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
import {getRandomNumber} from "./utils";
import bigInt = require("big-integer");
import {BigNumber} from "big-integer";
// import {eigs} from "mathjs"
import {EigenvalueDecomposition, inverse, Matrix} from "ml-matrix";
import {MAX_FLOATING_NUMBER} from "../Constants/Constants";

const N_Values = [4, 8, 16, 32, 64];

export const createClique = (graph: CompactAdjacencyMatrix, offset: number, n: number) => {
    for (let i = offset; i < n; i++) {
        for (let y = offset; y < n; y++) {
            graph.addEdge(i, y);
            graph.addEdge(y, i);
        }
    }
    return graph;
}

export const creatPath = (graph: CompactAdjacencyMatrix, offset: number, n: number) => {
    for (let i = offset; i < n - 1; i++) {
        graph.addEdge(i, i + 1);
        graph.addEdge(i + 1, i);
        graph.addEdge(i, i);
    }
    graph.addEdge(n - 1, n - 1);

    return graph;
}

const isVisitedAll = (visitedArray: number[]): boolean => {
    return visitedArray.filter((isVertexVisited) => isVertexVisited === 0).length === 0
};

export const getNormalAdjacencyMatrix = (graph: CompactAdjacencyMatrix): number[][] => {
    const n = graph.getMatrixSize();
    let normalCompactAdjacencyMatrix: number[][] = new Array(n);

    for (let i = 0; i < n; i++) {
        normalCompactAdjacencyMatrix[i] = new Array(n).fill(0);
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (graph.isEdgeExists(j, i)) {
                normalCompactAdjacencyMatrix[i][j] = (1 / graph.getNeighbors(j).length);
            } else {
                normalCompactAdjacencyMatrix[i][j] = 0;
            }
        }
    }
    return normalCompactAdjacencyMatrix;
}

export const randomWalk = (graph: CompactAdjacencyMatrix, vertex: number, t?: number): { coverTime: BigNumber, endVertex: number } => {
    let coverTime = bigInt(1);

    let curNeighbors: number[];
    let nextVertex: number;
    let nextVertexPlaceInNeighborsArray;
    let curVertex = vertex;
    const visitedArray = new Array(graph.getMatrixSize()).fill(0);
    visitedArray[curVertex] = 1;

    while (!isVisitedAll(visitedArray) && coverTime.valueOf() != t) {
        curNeighbors = graph.getNeighbors(curVertex);
        nextVertexPlaceInNeighborsArray = getRandomNumber(curNeighbors.length);
        nextVertex = curNeighbors[nextVertexPlaceInNeighborsArray];
        visitedArray[nextVertex] = 1;
        curVertex = nextVertex;
        coverTime = coverTime.add(1);
    }
    return {coverTime, endVertex: curVertex};
}

export const getStationaryProbabilityVector = (normalAdjacencyMatrix: number[][]): number[] => {
    let sum = 0;

    let A = new Matrix(normalAdjacencyMatrix);
    const e = new EigenvalueDecomposition(A);
    const real = e.realEigenvalues;

    let vectorIndex = -1;

    real.map((num, index) => {
        if (parseFloat(num.toFixed(2)) === 1) {
            vectorIndex = index;
        }
    })

    if (vectorIndex === -1) {
        return []
    }


    const vectors = e.eigenvectorMatrix;
    let pi = vectors.getColumn(vectorIndex)
    pi.map((i) => sum += i);

    pi = pi.map(value => {
        return parseFloat((value / sum).toFixed(MAX_FLOATING_NUMBER));
    })
    return pi;
}

export const getProbabilityVector = (n: number, index: number) => {
    const probabilityVector = new Array(n).fill(0);
    probabilityVector[index] = 1;
}

export const matrixMulVector = (normalAdjacencyMatrix: number[][], vector: number[]): Matrix => {
    let A = new Matrix(normalAdjacencyMatrix);
    let B = new Matrix([vector]);

    return A.mmul(B.transpose());
};

export const toFixVector = (vector: number[]): number[] => {
    return vector.map((num) => parseFloat(num.toFixed(MAX_FLOATING_NUMBER)));
}

export const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export const pageRank = ({
                             graph,
                             vertex,
                             t,

                         }: { graph: CompactAdjacencyMatrix, vertex: number, t: number }): void => {
    for (let j = 0; j < N_Values.length; j++) {
        const visitedArray = new Array(graph.getMatrixSize()).fill(0);
        const N = N_Values[j];

        for (let i = 0; i < t; i++) {
            const res = randomWalk(graph, vertex, N);
            visitedArray[res.endVertex]++;
        }

        console.log(`histograma of pagerank with N=${N} : [${visitedArray}]`)
        console.log(`histograma of pagerank with N=${N} : [${visitedArray.map((a) => a / t)}]`)
    }

}