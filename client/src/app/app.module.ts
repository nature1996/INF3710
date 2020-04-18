import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AddFilmComponent } from "./add-film/add-film.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { EcouterVideoComponent } from "./ecouter-video/ecouter-video.component";
import { FilmDetailComponent } from "./film-detail/film-detail.component";
import { FilmListComponent } from "./film-list/film-list.component";
import { LoginComponent } from "./login/login.component";

import { MatVideoModule } from "mat-video";
import { AcheterFilmComponent } from "./acheter-film/acheter-film.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { LoginGuard } from "./login.guard";

@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    FilmDetailComponent,
    LoginComponent,
    EcouterVideoComponent,
    AddFilmComponent,
    AdminPageComponent,
    AcheterFilmComponent,
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatVideoModule,
  ],
  providers: [CommunicationService, LoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
