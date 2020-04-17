import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { FilmDetailComponent } from "./film-detail/film-detail.component";
import { FilmListComponent } from "./film-list/film-list.component";
import { LoginComponent } from "./login/login.component";
import { EcouterVideoComponent } from './ecouter-video/ecouter-video.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmListComponent,
    FilmDetailComponent,
    LoginComponent,
    EcouterVideoComponent,
    AddFilmComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
