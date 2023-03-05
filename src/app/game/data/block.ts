import { Terrain, Tundra } from "./terrain";

export class Block {

    public terrain: Terrain;

    constructor(private x: number, private y: number, private seed: number) {
        this.terrain = new Tundra();
    }

}