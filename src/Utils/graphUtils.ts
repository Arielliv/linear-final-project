import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
import {getRandomNumber} from "./utils";
import bigInt = require("big-integer");
import {BigNumber} from "big-integer";
// import {eigs} from "mathjs"
import {EigenvalueDecomposition, inverse, Matrix} from "ml-matrix";
import {MAX_FLOATING_NUMBER} from "../Constants/Constants";


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

export const randomWalk = (graph: CompactAdjacencyMatrix, vertex: number): BigNumber => {
    let coverTime = bigInt(1);

    let curNeighbors: number[];
    let nextVertex: number;
    let nextVertexPlaceInNeighborsArray;
    let curVertex = vertex;
    const visitedArray = new Array(graph.getMatrixSize()).fill(0);
    visitedArray[curVertex] = 1;

    while (!isVisitedAll(visitedArray)) {
        curNeighbors = graph.getNeighbors(curVertex);
        nextVertexPlaceInNeighborsArray = getRandomNumber(curNeighbors.length);
        nextVertex = curNeighbors[nextVertexPlaceInNeighborsArray];
        visitedArray[nextVertex] = 1;
        curVertex = nextVertex;
        coverTime = coverTime.add(1);
    }
    return coverTime;
}

// export const getStationaryProbabilityVector = (normalAdjacencyMatrix: number[][]): number[] => {
//     let sum = 0;
//
//     let ans = eigs(normalAdjacencyMatrix);
//     let vectorIndex = -1;
//
//     ans.values.map((num, index) => {
//         // if (Math.trunc(num * 100) / 100 === 1) {
//         //     vectorIndex = index;
//         // }
//         if (parseFloat(num.toFixed(2)) === 1) {
//             vectorIndex = index;
//         }
//     })
//
//     if (vectorIndex === -1) {
//         return []
//     }
//
//     let pi;
//     ans.vectors.forEach((a, index) => {
//         if (index === vectorIndex) {
//             pi = a;
//         }
//     })
//
//     pi.map((i) => sum += i);
//
//     pi = pi.map(value => {
//         return parseFloat((parseFloat(value) / sum).toFixed(2));
//     })
//     return pi;
// }

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

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}