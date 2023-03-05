import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faKeyboard } from '@fortawesome/free-regular-svg-icons';
import { faAnchor, faCircleChevronLeft, faFish, faFishFins, faSailboat, faShip, faShrimp } from '@fortawesome/free-solid-svg-icons';
import { HistoricalFigures } from 'src/app/game/data/historical-data';
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
  keyboardIcon = faKeyboard;
  backIcon = faCircleChevronLeft;
  i10n = DeI10n;
  hidePicker = false;
  showNewGame = false;

  randomEmpire = Object.keys(HistoricalFigures)[Math.floor(Math.random() * Object.keys(HistoricalFigures).length)];
  randomName = HistoricalFigures[this.randomEmpire][Math.floor(Math.random() * HistoricalFigures[this.randomEmpire].length)];

  newgameFormGroup = new FormGroup({
    empire: new FormControl(this.randomEmpire, Validators.required),
    name: new FormControl(this.randomName, Validators.required),
    seed: new FormControl(''),
  });

  listItems: string[] = [
    this.i10n.home.newgame,
    this.i10n.home.continuegame,
    this.i10n.home.loadgame,
    this.i10n.home.achievements,
  ];

  constructor(
    private controller: GameControllerService,
    private router: Router
    ) {
    while (this.randomIcon1.iconName == this.randomIcon2.iconName) {
      this.randomIcon2 = this.randomboatIcons[Math.floor(Math.random() * 6)];
    }
  }

  onListitemPicked(event: number): void {
    switch (event) {
      case 0:
        this.hidePicker = true;
        this.showNewGame = true;
        break;

      case 1:

        break;

      case 2:

        break;

      case 3:

        break;
    }
  }

  onStartNewGame(event: FormGroupDirective): void {
    if (!this.newgameFormGroup.valid)
      return;
    this.controller.newGame(this.newgameFormGroup.value.name!, this.newgameFormGroup.value.empire!, this.newgameFormGroup.value.seed).subscribe((progress) => {
      //console.log(progress);
    });
  }

}
