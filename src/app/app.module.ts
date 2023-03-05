import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './comps/game/game.component';
import { HomeComponent } from './comps/home/home.component';
import { AchievementsService } from './svcs/achievements.service';
import { GameControllerService } from './svcs/game-controller.service';
import { ListPickerComponent } from './utils/list-picker/list-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    ListPickerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: GameControllerService, useClass: GameControllerService, multi: false},
    { provide: AchievementsService, useClass: AchievementsService, multi: false, deps: [GameControllerService]},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
