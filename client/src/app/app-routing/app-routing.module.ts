import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { FilmListComponent } from "../film-list/film-list.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "filmlist", component: FilmListComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
