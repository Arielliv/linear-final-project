export class CompactAdjacencyMatrix {
    private matrix: number[][];

    constructor(private n: number) {
        this.matrix = new Array(n);
        for (let i = 0; i < n; i++) {
            this.matrix[i] = new Array(n).fill(0);
        }
    }

    public addEdge(i: number, j: number): void {
        this.matrix[i][j] = 1;
    }

    public getEdge(i: number, j: number): number {
        return this.matrix[i][j];
    }

    public edges(): string {
        let edgesStr = '';
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.getEdge(i, j) === 1) {
                    edgesStr += `[ ${i},${j} ] `;
                }
            }
        }
        return edgesStr;
    }

}