import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Block } from '../game/data/block';
import { Game } from '../game/game';

@Injectable({
  providedIn: 'root'
})
export class GameControllerService {

  private game?: Game;

  @Output() newGameStartedEvent: EventEmitter<Game> = new EventEmitter<Game>();

  constructor() {
  }

  public get board(): Block[][]|undefined {
    return this.game?.board;
  }

  public get gameRunning(): boolean {
    return this.game != undefined;
  }

  private hashstring(strin: string): number {
    let strout = '';
    for (let i = 0; i < strin.length; i++) {
      strout += strin.charCodeAt(i) - 48;
    }
    const maxlen = ('' + Number.MAX_SAFE_INTEGER).length -1;
    while(strout.length > maxlen) {
      strout = (+strout[0] + +strout[1]) + strout.substring(2);
    }
    return +strout;
  }

  public newGame(playername: string, empirename: string, seed?: number | string | null): ReplaySubject<number|boolean> {
    let subject = new ReplaySubject<number|boolean>(0);
    //if (this.gameRunning)
    //  return false;
    if (seed == null || seed == undefined || seed === '')
      seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    else
      seed = this.hashstring('' + seed);
    this.game = new Game(playername, empirename, seed, { x: 512, y: 384 });
    this.game.generate().subscribe((progress) => {
      console.log(progress);
      subject.next(progress);
      if (progress === true)
        this.newGameStartedEvent.emit(this.game);
    });
    return subject;
  }

}
