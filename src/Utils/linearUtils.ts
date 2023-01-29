import {Matrix} from "ml-matrix";
import {getRandomNumber} from "./utils";

const tf = require("@tensorflow/tfjs-node");

export const isDistanceBetweenTwoVectorsSmallerThen = (u: Matrix, v: Matrix, delta: number): boolean => {
    return getVectorNorma((Matrix.sub(u, v)).getColumn(0)) < delta;
}

export const getVectorNorma = (initVector: number[]) => {
    let sum = 0
    initVector.map((val) => {
        sum += Math.pow(val, 2);
    });
    return Math.sqrt(sum);
}

export const getRandomVector = (n: number): Matrix => {
    const randomVector = [];
    for (let i = 0; i < n; i++) {
        randomVector.push(getRandomNumber(n));
    }
    return new Matrix([randomVector]);
}

export const matrixMulVector = (normalAdjacencyMatrix: number[][], vector: number[]): Matrix => {
    let A = new Matrix(normalAdjacencyMatrix);
    let B = new Matrix([vector]);

    return A.mmul(B.transpose());
};

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

export const gramSchmidtAlgo = async (span: number[][]): Promise<number[][]> => {
    const res = [];
    const input = tf.tensor2d(span);
    const p = (await (await tf.linalg.gramSchmidt(input)).array());
    p.map((col: number[]) => {
        if (!col.includes(Number.NaN)) {
            res.push(col);
        }
    })
    return res;

}
