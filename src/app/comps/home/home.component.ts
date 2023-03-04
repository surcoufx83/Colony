import { Component } from '@angular/core';
import { faAnchor, faFish, faFishFins, faSailboat, faShip, faShrimp } from '@fortawesome/free-solid-svg-icons';
import { DeI10n } from 'src/app/i10n/de';
import { GameControllerService } from 'src/app/svcs/game-controller.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  randomboatIcons = [faSailboat, faFish, faFishFins, faAnchor, faShip, faShrimp];
  randomIcon1 = this.randomboatIcons[Math.floor(Math.random() * 6)];
  randomIcon2 = this.randomboatIcons[Math.floor(Math.random() * 6)];
  i10n = DeI10n;
  hidePicker = false;

  listItems: string[] = [
    this.i10n.home.newgame,
    this.i10n.home.continuegame,
    this.i10n.home.loadgame,
  ];

  constructor(private controller: GameControllerService) {
    while (this.randomIcon1.iconName == this.randomIcon2.iconName) {
      this.randomIcon2 = this.randomboatIcons[Math.floor(Math.random() * 6)];
    }
  }

  onListitemPicked(event: number): void {
    switch (event) {
      case 0:
        this.controller.newGame('stefan', 'ksdjksd')
        console.log(this.controller)
        this.hidePicker = true;
        break;

      case 1:

        break;

      case 2:

        break;
    }
  }

}
