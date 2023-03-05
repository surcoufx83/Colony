import { Component } from '@angular/core';
import { AchievementsService } from './svcs/achievements.service';
import { GameControllerService } from './svcs/game-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private controller: GameControllerService,
    private achievements: AchievementsService
  ) { }
  
}
