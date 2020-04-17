import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { EcouterVideoComponent } from "../ecouter-video/ecouter-video.component";
import { FilmDetailComponent } from "../film-detail/film-detail.component";
import { FilmListComponent } from "../film-list/film-list.component";
import { LoginComponent } from "../login/login.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "films_list", component: FilmListComponent },
  { path: "film_detail/:filmID", component: FilmDetailComponent},
  { path: "login", component: LoginComponent},
  { path: "ecouter/:filmID", component: EcouterVideoComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
