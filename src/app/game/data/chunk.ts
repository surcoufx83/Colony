import { Terrain } from "./terrain";
import { XY } from "./xy";

export class Chunk {

    private sectorsiv: { [key: string]: number } = {};
    private sectors: { [key: string]: Terrain } = {};
    private initcoords: XY = { x: 0, y: 0 };
    private coords: XY;

    constructor(private y: number, private x: number, private chunksize: number) {
        this.coords = { x: x * chunksize, y: y * chunksize };
    }

    public createSector(seed: string): void {
        if (this.isInitialized)
            return;
        for (let i = 0; i < seed.length; i++) {
            this.sectorsiv[`${this.initcoords.x}:${this.initcoords.y}`] = +seed[i];
            console.log(this.initcoords);
            this.nextinitcoords();
            if (this.isInitialized)
                return;
        }
    }

    public createTerrain(left?: Chunk, above?: Chunk, right?: Chunk, below?: Chunk): void {
        console.log('createTerrain', this, left, above, right, below)

    }

    public getTerrainAt(x: number, y: number): Terrain|undefined {
        return this.sectors[`${x}:${y}`]
    }

    public get isInitialized(): boolean {
        return Object.keys(this.sectorsiv).length == 256;
    }

    private nextinitcoords(): void {
        if (this.initcoords.x + 1 == this.chunksize && this.initcoords.y + 1 == this.chunksize)
            return;
        this.initcoords.x += 1;
        if (this.initcoords.x == this.chunksize) {
            this.initcoords.y += 1;
            this.initcoords.x = 0;
        }
    }

    private rewindinitcoords(): void {
        this.initcoords = { x: 0, y: 0 };
    }

}