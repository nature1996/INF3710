import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Visionement } from "../../../../common/request/Visionement";
import { Utilisateur } from "../../../../common/tables/Utilisateur";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-acheter-film",
  templateUrl: "./acheter-film.component.html",
  styleUrls: ["./acheter-film.component.css"],
})
export class AcheterFilmComponent implements OnInit {
  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communicationService: CommunicationService
  ) {}

  public activeUser: Utilisateur;
  public filmID: number;
  public visionement: Visionement;

  public ngOnInit(): void {
    this.communicationService.activeUser.subscribe((activeUser) => {
      this.activeUser = activeUser;
    });
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.filmID = parseInt(params.get("filmID"), 10);

          return this.communicationService.getVisionementInfo(this.filmID);
        })
      )
      .subscribe((visionement: Visionement) => {
        if (visionement !== null) {
          this.router.navigate(["ecouter/", this.filmID]);
        }
      });
  }

  public acheterFilm(): void {
    this.communicationService
      .insertCommandVisionement(this.activeUser, this.filmID)
      .subscribe((observer) => {
        console.log(observer);
      });
    this.router.navigate(["ecouter/", this.filmID]);
  }
}
