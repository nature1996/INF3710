import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Film } from "../../../../common/tables/Film";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-film-detail",
  templateUrl: "./film-detail.component.html",
  styleUrls: ["./film-detail.component.css"]
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

  public ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.communicationService.getFilmDetail(
          parseInt(params.get("filmID"), 10)
        )
      )
    ).subscribe((film: Film) => {
      this.film = film;
      console.log("got film with id:", this.film.numero);
    });
  }
  public getAnnee(film: Film): string {
    let annee: string = "";
    annee += film.dateProduction;

    return annee;
  }

}
