import { EventEmitter } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Block } from "./data/block";
import { MersenneTwister } from "./data/mersenne-twister";
import { XY } from "./data/xy";
import { Empire } from "./empire";
import { Player } from "./player";

export class Game {

    private player: Player;
    private empire: Empire;
    public blockrows: Block[][] = [];

    private generator: MersenneTwister;
    private generateSubject?: ReplaySubject<number | boolean>;

    public generateRowCompleted: EventEmitter<number> = new EventEmitter<number>();
    public generateAllChunksCompleted: EventEmitter<void> = new EventEmitter<void>();

    constructor(player: string, empire: string, private seed: number, private dimensions: XY) {
        this.player = new Player(player);
        this.empire = new Empire(empire);
        this.generator = new MersenneTwister(this.seed);
        this.generateRowCompleted.subscribe((i) => this.generateSubject?.next(Math.floor(i / this.dimensions.y * 100 / 4)));
    }

    public get board(): Block[][] {
      return this.blockrows;
    }

    public generate(): ReplaySubject<number | boolean> {
        this.generateSubject = new ReplaySubject<number | boolean>(0);
        setTimeout(() => {
            this.generateWorld();
        });
        return this.generateSubject;
    }

    private generateSectorSeed() : string {
        let seed = '';
        while (seed.length < 1024) {
            seed += this.generator.generate();
        }
        return seed;
    }

    generateWorld(): void {
        this.blockrows = [];
        const totalsize = this.dimensions.x * this.dimensions.y;
        let fullseed = this.generateSectorSeed();
        let i = 0;
        for (let y = 0; y < this.dimensions.y; y++) {
            let row: Block[] = [];
            for (let x = 0; x < this.dimensions.x; x++) {
                if (i == 1024) {
                    fullseed = this.generateSectorSeed();
                    i = 0;
                }
                row.push(new Block(x, y, +fullseed.substring(i, i + 1)));
                i++;
            }
            this.blockrows.push(row);
            this.generateRowCompleted.emit(y + 1);
        }
        console.log(this.blockrows)
        for (let y = 0; y < this.dimensions.y / 2; y++) {
            for (let x = 0; x < this.dimensions.x; x++) {
                this.generateWorldBlockTerrain(this.getBlock(x, y)!, this.getBlock(x - 1, y), this.getBlock(x, y - 1), this.getBlock(x + 1, y), this.getBlock(x, y + 1));

            }
            break;
        }
        this.generateAllChunksCompleted.emit();
        console.log(this);
        this.generateSubject?.next(true);
    }

    generateWorldBlockTerrain(block: Block, left?: Block, above?: Block, right?: Block, below?: Block) {
        console.log(block, left, above, right, below);
    }

    getBlock(x: number, y: number) : Block|undefined {
        if (this.blockrows[y] != undefined)
            return this.blockrows[y][x];
        return undefined;
    }

    populateWorld(): void {

    }

}
