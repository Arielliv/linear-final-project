import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
import {getRandomNumber} from "./utils";
import {BigNumber} from "big-integer";
import {EigenvalueDecomposition, Matrix} from "ml-matrix";
import {MAX_FLOATING_NUMBER} from "../Constants/Constants";
import bigInt = require("big-integer");
import {getRandomVector, getVectorNorma, isDistanceBetweenTwoVectorsSmallerThen} from "./linearUtils";


const tf = require("@tensorflow/tfjs-node");

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


export const powerIteration = ({
                                   graph,
                                   delta,
                                   t, initVector
                               }: { graph: CompactAdjacencyMatrix, delta: number, t: number, initVector?: Matrix }): Matrix => {
    let initialU = initVector || getRandomVector(graph.getMatrixSize()).transpose();
    const A = new Matrix(graph.getMatrix());
    let v: Matrix;

    let currentU = initialU;
    let nextU: Matrix;

    for (let i = 0; i < t; i++) {
        v = A.mmul(currentU);

        const norma = getVectorNorma(v.getColumn(0));
        nextU = v.divide(norma);
        if (isDistanceBetweenTwoVectorsSmallerThen(nextU, currentU, delta)) {
            break;
        }

        currentU = nextU;
    }
    return nextU;
}

export const gramSchmidtAlgo = async (span: number[][]): Promise<number[][]> => {
    const res = [];
    const input = tf.tensor2d(span);
    const p = (await (await tf.linalg.gramSchmidt(input)).array());
    p.map((col: number[], index) => {
        if (!col.includes(Number.NaN)) {
            res.push(col);
        }
    })
    return res;

}

export const getVectorProjectionOnSpan = (span: number[][], vector: Matrix): Matrix => {
    let A = new Matrix(span);
    let projVector = new Matrix(1, span[0].length);

    for (let i = 0; i < A.rows; i++) {
        let rowMatrix = new Matrix([A.getRow(i)]);

        let numerator = (rowMatrix).mmul(vector).getColumn(0)[0];

        let denominator = Math.pow((getVectorNorma(rowMatrix.getRow(0))), 2)

        let fraction = numerator / denominator;

        projVector.add(rowMatrix.mul(fraction));
    }

    return projVector;
}

export const generalizedPowerIteration = async ({
                                                    graph,
                                                    delta,
                                                    kBiggestEigenvector
                                                }: { graph: CompactAdjacencyMatrix, delta: number, kBiggestEigenvector: number }) => {
    const spanU: number[][] = [];
    const V = powerIteration({graph, delta, t: 10000});
    spanU.push(V.getColumn(0));

    let W = getRandomVector(graph.getMatrixSize()).transpose();

    let projWOnSpan = getVectorProjectionOnSpan((spanU), W).transpose();
    let curU = W.sub(projWOnSpan);
    let curV = curU;

    for (let i = 0; i < kBiggestEigenvector; i++) {
        curU = powerIteration({graph, delta, t: 50, initVector: curV});
        spanU.push(curU.getColumn(0));
        const orthogonalBasisOfSpanU = await gramSchmidtAlgo(spanU);
        projWOnSpan = getVectorProjectionOnSpan((orthogonalBasisOfSpanU), W).transpose();

        curV = W.sub(projWOnSpan);
    }

    return curV;
}