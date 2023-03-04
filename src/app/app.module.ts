import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './comps/game/game.component';
import { HomeComponent } from './comps/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ListPickerComponent } from './utils/list-picker/list-picker.component';
import { GameControllerService } from './svcs/game-controller.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    ListPickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: GameControllerService, useClass: GameControllerService, multi: false}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
