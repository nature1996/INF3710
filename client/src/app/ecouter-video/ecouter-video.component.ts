import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Film } from "../../../../common/tables/Film";
import { Utilisateur } from "../../../../common/tables/Utilisateur";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-ecouter-video",
  templateUrl: "./ecouter-video.component.html",
  styleUrls: ["./ecouter-video.component.css"],
})
export class EcouterVideoComponent implements OnInit {
  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communicationService: CommunicationService
  ) {}

  public activeUser: Utilisateur;

  public ngOnInit(): void {
    this.communicationService.activeUser.subscribe((activeUser) => {
      this.activeUser = activeUser;
    });
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.communicationService.getFilmDetail(
            parseInt(params.get("filmID"), 10)
          )
        )
      )
      .subscribe((film: Film) => {
        /* this.film = film;
        console.log("got film with id:", this.film.numero); */
      });
  }
}
