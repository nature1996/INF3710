import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { RoleActeur } from "../../../../common/request/RoleActeur";
import { Film } from "../../../../common/tables/Film";
import { Oscar } from "../../../../common/tables/Oscar";
import { Utilisateur } from "../../../../common/tables/Utilisateur";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-film-detail",
  templateUrl: "./film-detail.component.html",
  styleUrls: ["./film-detail.component.css"],
})
export class FilmDetailComponent implements OnInit {
  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communicationService: CommunicationService
  ) {
    // void
  }
  public film: Film;
  public roles: RoleActeur[];
  public oscars: Oscar[];
  public activeUser: Utilisateur;

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.communicationService.getFilmDetail(
            parseInt(params.get("filmID"), 10)
          )
        )
      )
      .subscribe((film: Film) => {
        this.film = film;
        console.log("got film with id:", this.film.numero);
        this.getActor();
        this.getOscar();
      });
    this.communicationService.activeUser.subscribe((activeUser) => {
      this.activeUser = activeUser;
    });
  }

  public getActor(): void {
    this.communicationService
      .getRoleFilm(this.film.numero)
      .subscribe((roles: RoleActeur[]) => {
        this.roles = roles;
      });
  }

  public getOscar(): void {
    this.communicationService
      .getOscarFilm(this.film.numero)
      .subscribe((oscars: Oscar[]) => {
        this.oscars = oscars;
      });
  }

  public getAnnee(film: Film): string {
    let annee: string = "";
    annee += new Date(film.dateProduction).getFullYear();

    return annee;
  }
}
