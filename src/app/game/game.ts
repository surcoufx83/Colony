import { EventEmitter } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Chunk } from "./data/chunk";
import { MersenneTwister } from "./data/mersenne-twister";
import { Empire } from "./empire";
import { Player } from "./player";

export class Game {

    private player: Player;
    private empire: Empire;
    private chunks: Chunk[] = [];
    private chunksize = 16;
    private worldsize = [32, 24];

    private generateSubject?: ReplaySubject<number | boolean>;

    public generateChunkCompleted: EventEmitter<number> = new EventEmitter<number>();
    public generateAllChunksCompleted: EventEmitter<void> = new EventEmitter<void>();

    constructor(player: string, empire: string, private seed: number) {
        this.player = new Player(player);
        this.empire = new Empire(empire);
        this.generateChunkCompleted.subscribe((i) => this.generateSubject?.next(Math.floor(i / (this.worldsize[0] * this.worldsize[1]) * 100 / 4)));
    }

    public generate(): ReplaySubject<number | boolean> {
        this.generateSubject = new ReplaySubject<number | boolean>(0);
        setTimeout(() => {
            this.generateWorld();
        });
        return this.generateSubject;
    }

    generateWorld(): void {
        this.chunks = [];
        const pixels = (this.worldsize[0] * this.chunksize) * (this.worldsize[1] * this.chunksize);
        const generator = new MersenneTwister(this.seed);
        for (let y = 0; y < this.worldsize[1]; y++) {
            for (let x = 0; x < this.worldsize[0]; x++) {
                let chunk = new Chunk(y, x, this.chunksize);
                while (!chunk.isInitialized) {
                    console.log('Chunk x,y', x, y)
                    chunk.createSector('' + generator.generate());
                }
                this.chunks.push(chunk);
                this.generateChunkCompleted.emit(this.chunks.length);
            }
        }
        console.log(this);
        for (let i = 0; i < this.chunks.length; i++) {
            let chunk = this.chunks[i];
            let cy = Math.floor(i / this.worldsize[0]);
            let cx = i % this.worldsize[0];
            //console.log(i, cy, cx, chunk);
            chunk.createTerrain(this.getChunk(cy, cx - 1), this.getChunk(cy - 1, cx), this.getChunk(cy, cx + 1), this.getChunk(cy + 1, cx))
        }
        this.generateAllChunksCompleted.emit();
        console.log(this);
        
    }

    getChunk(y: number, x: number) : Chunk|undefined {
        return this.chunks[y * this.worldsize[0] + x];
    }

    populateWorld(): void {

    }

}
