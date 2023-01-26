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

    public isEdgeExists(i: number, j: number): boolean {
        return this.matrix[i][j] === 1;
    }

    public getMatrixSize(): number {
        return this.n;
    }

    public getMatrix(): number[][] {
        return this.matrix;
    }

    public getNeighbors(vertex: number): number[] {
        const neighbors = [];
        for (let i = 0; i < this.n; i++) {
            if (this.isEdgeExists(i, vertex)) {
                neighbors.push(i);
            }
        }
        return neighbors;
    }

    public edges(): string {
        let edgesStr = '';
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (this.isEdgeExists(i, j)) {
                    edgesStr += `[ ${i},${j} ] `;
                }
            }
        }
        return edgesStr;
    }

}