import {Matrix} from "ml-matrix";
import {getRandomNumber} from "./utils";

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