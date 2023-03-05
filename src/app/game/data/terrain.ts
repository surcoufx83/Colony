export interface Terrain {
    /**
     * Percentage: Maximum y coords from top or bottom.
     */
    maxy: number;

    /**
     * Number: If random number is below this value, this terrain will be the same the one next to it left side.
     */
    spreadx: number;

    /**
     * Number: If random number is below this value, this terrain will be the same the one next to it top side.
     */
    spready: number;
}

export class Tundra implements Terrain {
    maxy = .1;
    spreadx = 8;
    spready = 5;
}