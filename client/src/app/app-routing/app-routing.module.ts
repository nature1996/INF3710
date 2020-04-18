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
import { LoginGuard } from "../login.guard";
import { LoginComponent } from "../login/login.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "", redirectTo: "/films_list", pathMatch: "full" },
  {
    path: "films_list",
    component: FilmListComponent,
    canActivate: [LoginGuard],
  },
  {
    path: "film_detail/:filmID",
    component: FilmDetailComponent,
    canActivate: [LoginGuard],
  },
  { path: "login", component: LoginComponent },
  {
    path: "ecouter/:filmID",
    component: EcouterVideoComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [LoginGuard],
  },
  {
    path: "acheter/:filmID",
    component: AcheterFilmComponent,
    canActivate: [LoginGuard],
  },
  { path: "admin/ajouterfilm", component: AddFilmComponent },
  { path: "admin/ajouterutilisateur", component: AddUserComponent },
  { path: "admin", component: AdminPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
