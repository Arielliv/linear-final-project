export class CompactAdjacencyMatrix {
    private readonly matrix: number[][];
    private readonly neighbors: number[][];

    constructor(private n: number) {
        this.matrix = new Array(n);
        this.neighbors = new Array(n);

        for (let i = 0; i < n; i++) {
            this.matrix[i] = new Array(n).fill(0);
            this.neighbors[i] = [];
        }
    }

    public addEdge(i: number, j: number): void {
        this.matrix[i][j] = 1;
        this.neighbors[i].push(j);
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

    public getNeighborsSize(vertex: number): number {
        return this.getNeighbors(vertex).length;
    }

    public getNeighbors(vertex: number): number[] {
        return this.neighbors[vertex];
    }

    public getNeighborByIndex(vertex: number, index: number): number {
        return this.getNeighbors(vertex)[index];
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