import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AcheterFilmComponent } from "../acheter-film/acheter-film.component";
import { AddFilmComponent } from "../add-film/add-film.component";
import { AddUserComponent } from "../add-user/add-user.component";
import { AdminPageComponent } from "../admin-page/admin-page.component";
import { AppComponent } from "../app.component";
import { CanDeactivateGuard } from "../can-deactivate.guard";
import { EcouterVideoComponent } from "../ecouter-video/ecouter-video.component";
import { FilmDetailComponent } from "../film-detail/film-detail.component";
import { FilmListComponent } from "../film-list/film-list.component";
import { LoginComponent } from "../login/login.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "films_list", component: FilmListComponent },
  { path: "film_detail/:filmID", component: FilmDetailComponent },
  { path: "login", component: LoginComponent },
  {
    path: "ecouter/:filmID",
    component: EcouterVideoComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  { path: "acheter/:filmID", component: AcheterFilmComponent },
  { path: "admin/ajouterfilm", component: AddFilmComponent },
  { path: "admin/ajouterutilisateur", component: AddUserComponent },
  { path: "admin", component: AdminPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
