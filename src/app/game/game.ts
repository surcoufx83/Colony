import { Player } from "./player";

export class Game {

    private player: Player;

    constructor(player: string) {
        this.player = new Player(player);
    }

}