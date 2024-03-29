export const getRandomNumber = (max: number, min = 0): number => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}