import { Injectable } from '@angular/core';
import { Game } from '../game/game';

@Injectable({
  providedIn: 'root'
})
export class GameControllerService {

  private game?: Game;

  constructor() { }

  public get gameRunning(): boolean {
    return this.game != undefined;
  }

  public newGame(playername: string, seed: string): boolean {
    if (this.gameRunning)
      return false;
    this.game = new Game(playername);
    return true;
  }

}
