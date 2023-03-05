import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameControllerService } from 'src/app/svcs/game-controller.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(
    private controller: GameControllerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.controller.gameRunning)
      this.router.navigate(['/']);
  }

  

}
