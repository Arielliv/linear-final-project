import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
import {arraysEqual, getRandomNumber} from "./utils";
import {BigNumber} from "big-integer";
import {EigenvalueDecomposition, Matrix} from "ml-matrix";
import {MAX_FLOATING_NUMBER, N_Values} from "../Constants/Constants";
import {
    getNormalizedVector,
    getRandomVector,
    getVectorNorma,
    getVectorProjectionOnSpan,
    gramSchmidtAlgo,
    isDistanceBetweenTwoVectorsSmallerThen, matrixMulVector
} from "./linearUtils";
import bigInt = require("big-integer");



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
export const stationaryProbabilityVectorCheck = (normalAdjacencyMatrix: number[][], StationaryProbabilityVector: number[]) => {
    let vectorToCheck = matrixMulVector(normalAdjacencyMatrix, StationaryProbabilityVector).getColumn(0);
    vectorToCheck = vectorToCheck.map((value => parseFloat(value.toFixed(MAX_FLOATING_NUMBER))));

    return arraysEqual(toFixVector(vectorToCheck), StationaryProbabilityVector)

}
export const getStationaryProbabilityVector = (normalAdjacencyMatrix: number[][]): number[] => {
    let sum = 0;
    let vectorIndex = -1;

    let A = new Matrix(normalAdjacencyMatrix);
    const res = new EigenvalueDecomposition(A);

    const eigenvalues = res.realEigenvalues;

    eigenvalues.map((num, index) => {
        if (parseFloat(num.toFixed(2)) === 1) {
            vectorIndex = index;
        }
    })

    if (vectorIndex === -1) {
        return [];
    }

    const eigenvectors = res.eigenvectorMatrix;

    let pi = eigenvectors.getColumn(vectorIndex)

    return getNormalizedVector(pi).map((value => parseFloat(value.toFixed(MAX_FLOATING_NUMBER))));
}

export const getProbabilityVector = (n: number, index: number) => {
    const probabilityVector = new Array(n).fill(0);
    probabilityVector[index] = 1;
}

export const toFixVector = (vector: number[]): number[] => {
    return vector.map((num) => parseFloat(num.toFixed(MAX_FLOATING_NUMBER)));
}


export const pageRank = ({
                             graph,
                             vertex,
                             t,
                         }: { graph: CompactAdjacencyMatrix, vertex: number, t: number }): void => {
    for (const element of N_Values) {
        const visitedArray = new Array(graph.getMatrixSize()).fill(0);
        const N = element;

        for (let i = 0; i < t; i++) {
            const res = randomWalk(graph, vertex, N);
            visitedArray[res.endVertex]++;
        }

        console.log(`histograma of pagerank with N=${N} : [${visitedArray}]`)
        console.log(`histograma of pagerank with N=${N} : [${visitedArray.map((a) => a / t)}]`)
    }

}


export const powerIteration = ({
                                   graph,
                                   delta,
                                   t, initVector
                               }: { graph: number[][], delta: number, t: number, initVector?: Matrix }): Matrix => {
    let initialU = initVector || getRandomVector(graph.length, 1).transpose();
    const A = new Matrix(graph);
    let v: Matrix;

    let currentU = initialU;
    let nextU: Matrix;

    for (let i = 0; i < t; i++) {
        v = A.mmul(currentU);

        nextU = new Matrix([getNormalizedVector(v.getColumn(0))]).transpose()
        if (isDistanceBetweenTwoVectorsSmallerThen(nextU, currentU, delta)) {
            break;
        }

        currentU = nextU;
    }
    return nextU;
}

export const getEigenvalue = (matrix: number[][], eigenvector: Matrix): number => {
    const A = new Matrix(matrix);
    const resVector = new Array(matrix.length);
    const eigenvectorV = eigenvector.getColumn(0);

    const mulRes = A.mmul(eigenvector).getColumn(0);

    for (let i = 0; i < mulRes.length; i++) {
        resVector[i] = mulRes[i] / eigenvectorV[i] || 0;
    }

    return resVector[0];
}


export const generalizedPowerIteration = async ({
                                                    graph,
                                                    delta,
                                                    kBiggestEigenvector
                                                }: { graph: CompactAdjacencyMatrix, delta: number, kBiggestEigenvector: number }): Promise<number> => {
    const spanU: number[][] = [];

    const normalizedAdjacencyMatrix = getNormalAdjacencyMatrix(graph)
    const V = powerIteration({graph: normalizedAdjacencyMatrix, delta, t: 1000});

    if (kBiggestEigenvector === 0) {
        return getEigenvalue(normalizedAdjacencyMatrix, V);
    }
    spanU.push(V.getColumn(0));

    let W = getRandomVector(graph.getMatrixSize()).transpose();

    let projWOnSpan = getVectorProjectionOnSpan((spanU), W).transpose();

    let curU = W.sub(projWOnSpan);

    let curV = curU;

    for (let i = 0; i < kBiggestEigenvector; i++) {
        curU = powerIteration({graph: normalizedAdjacencyMatrix, delta, t: 1000000, initVector: curV});
        spanU.push(curU.getColumn(0));
        const orthogonalBasisOfSpanU = await gramSchmidtAlgo(spanU);
        projWOnSpan = getVectorProjectionOnSpan((orthogonalBasisOfSpanU), W).transpose();

        curV = W.sub(projWOnSpan);
    }

    return getEigenvalue(normalizedAdjacencyMatrix, curV);
}