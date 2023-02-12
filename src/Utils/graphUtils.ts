import {CompactAdjacencyMatrix} from "../CompactAdjacencyMatrix/CompactAdjacencyMatrix";
import {arraysEqual, getRandomNumber} from "./utils";
import {BigNumber} from "big-integer";
import {EigenvalueDecomposition, Matrix} from "ml-matrix";
import {Delta_Values, MAX_FLOATING_NUMBER, MAX_NUMBER, N_Values} from "../Constants/Constants";
import {
    getNormalizedVector,
    getRandomVector,
    getVectorProjectionOnSpan,
    gramSchmidtAlgo,
    isDistanceBetweenTwoVectorsSmallerThen, matrixMulVector
} from "./linearUtils";
import bigInt = require("big-integer");
import {createCliqueGraph} from "../Graphs/Clique";
import {createDoubleCliqueLinkedByPathGraph} from "../Graphs/DoubleCliqueLinkedByPath";
import {createRingGraph} from "../Graphs/Ring";
import {createLollipopGraph} from "../Graphs/Lollipop";


export const getGraphByNumber = (index: number): CompactAdjacencyMatrix => {
    if (index === 0) {
        return createCliqueGraph(MAX_NUMBER);
    } else if (index === 1) {
        return createRingGraph(MAX_NUMBER);
    } else if (index === 2) {
        return createLollipopGraph(MAX_NUMBER);
    } else if (index === 3) {
        return createDoubleCliqueLinkedByPathGraph(MAX_NUMBER);
    } else {
        console.log('wrong graph index');
    }
}

export const createClique = (graph: CompactAdjacencyMatrix, offset: number, n: number) => {
    for (let i = offset; i < n; i++) {
        for (let y = offset; y < n; y++) {
            graph.addEdge(i, y);
        }
    }

    return graph;
}

export const creatPath = (graph: CompactAdjacencyMatrix, offset: number, n: number) => {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if ((i + 1 === j) || (i === j + 1) || (i === j)) {
                graph.addEdge(i, j);
            }
        }
    }

    return graph;
}

const isVisitedAll = (visitedArray: boolean[]): boolean => {
    return visitedArray.every(Boolean);
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

    let nextVertex: number;
    let nextVertexPlaceInNeighborsArray;
    let curVertex = vertex;
    const visitedArray: boolean[] = new Array(graph.getMatrixSize()).fill(false);
    visitedArray[curVertex] = true;

    while (!isVisitedAll(visitedArray) && coverTime.valueOf() != t) {
        nextVertexPlaceInNeighborsArray = getRandomNumber(graph.getNeighborsSize(curVertex));
        nextVertex = graph.getNeighborByIndex(curVertex, nextVertexPlaceInNeighborsArray);
        visitedArray[nextVertex] = true;
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
export const getStationaryProbabilityVector = (graph: CompactAdjacencyMatrix, normalAdjacencyMatrix: number[][], graphIndex: number): number[] => {
    const stationaryProbabilityVector = new Array(normalAdjacencyMatrix.length);
    if (graphIndex === 0 || graphIndex === 1) {
        const vertexVal = parseFloat((1 / normalAdjacencyMatrix.length).toFixed(MAX_FLOATING_NUMBER));
        stationaryProbabilityVector.fill(vertexVal);
    } else {
        const sum = graph.getSumOfDegrees();

        for (let i = 0; i < normalAdjacencyMatrix.length; i++) {
            stationaryProbabilityVector[i] = parseFloat((graph.getNeighbors(i).length / sum).toFixed(MAX_FLOATING_NUMBER))
        }
    }
    return stationaryProbabilityVector;
};

/**
 * @deprecated
 */
export const DeprecatedGetStationaryProbabilityVector = (normalAdjacencyMatrix: number[][]): number[] => {
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
                             stationaryProbabilityVector
                         }: { graph: CompactAdjacencyMatrix, vertex: number, t: number, stationaryProbabilityVector: number[] }): void => {

    let i;
    for (const delta of Delta_Values) {
        for (const element of N_Values) {
            let shouldGetOut = false;
            const visitedArray: number[] = new Array(graph.getMatrixSize()).fill(0);
            const N = element;
            i = 1;

            while (i <= 100 || !shouldGetOut) {
                for (let y = 1; y <= t; y++) {
                    const res = randomWalk(graph, vertex, N);
                    visitedArray[res.endVertex]++;
                }

                if (isDistanceBetweenTwoVectorsSmallerThen(new Matrix([stationaryProbabilityVector]), new Matrix([visitedArray.map((a) => parseFloat((a / (i * t)).toFixed(MAX_FLOATING_NUMBER)))]), delta)) {
                    console.log('got in isDistanceBetweenTwoVectorsSmallerThen\n');
                    shouldGetOut = true;
                    break;
                }
                i++;
            }

            // console.log(`histograma of pagerank with N=${N} : [${visitedArray}]`)
            console.log(`histograma of pagerank with N=${N} with delta D=${delta} : histograma[${visitedArray.map((a) => parseFloat((a / (i * t)).toFixed(MAX_FLOATING_NUMBER)))}]\n`)
        }
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