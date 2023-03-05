import { Injectable } from '@angular/core';
import { DeI10n } from '../i10n/de';
import { GameControllerService } from './game-controller.service';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {

  achievements: { [key: string]: Achievement } = defaultAchievements;

  constructor(private controller: GameControllerService) {
    let olddata: string | null = localStorage.getItem('cgachievements');
    if (olddata !== null) {
      const old = <{ [key: string]: Achievement }>JSON.parse(<string>olddata);
      Object.keys(old).forEach((key, i) => {
        if (this.achievements[key] != undefined) {
          this.achievements[key].completed = old[key].completed;
          this.achievements[key].completeDate = old[key].completeDate;
          this.achievements[key].progressValue = old[key].progressValue;
          this.achievements[key].progressTarget = old[key].progressTarget;
        }
      });
    }
    this.save();
    this.subscribe();
  }

  private completed(event: Achievement) {
    if (!event.completed) {
      event.completed = true;
      event.completeDate = new Date();
      this.save();
      alert(`Event "${event.title}" completed!`)
    }
  }

  private save(): void {
    localStorage.setItem('cgachievements', JSON.stringify(this.achievements));
  }

  private subscribe(): void {
    this.controller.newGameStartedEvent.subscribe((game) => this.completed(this.achievements['newgame']));
  }

}

export interface Achievement {
  title: string;
  description: string;
  completed: boolean;
  completeDate?: Date;
  progressValue?: number;
  progressTarget?: number;
  type: AchievementType;
}

export enum AchievementType {
  SingleEvent,
  ProgressEvent,
}

const defaultAchievements: { [key: string]: Achievement } = {
  newgame: {
    title: DeI10n.achievements.newgame.title,
    description: DeI10n.achievements.newgame.description,
    completed: false,
    type: AchievementType.SingleEvent,
  },
};