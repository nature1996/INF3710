import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";

import { MatVideoComponent } from "mat-video/lib/video.component";
import { Observable } from "rxjs";
import { Visionement } from "../../../../common/request/Visionement";
import { Film } from "../../../../common/tables/Film";
import { Utilisateur } from "../../../../common/tables/Utilisateur";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-ecouter-video",
  templateUrl: "./ecouter-video.component.html",
  styleUrls: ["./ecouter-video.component.css"],
})
export class EcouterVideoComponent implements OnInit, AfterViewInit {
  @ViewChild("video") public matVideo: MatVideoComponent;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communicationService: CommunicationService
  ) {}

  public activeUser: Utilisateur;
  public film: Film;
  public visionement: Visionement;

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
        this.film = film;
        console.log("got film with id:", this.film.numero);
      });

    this.getVisionemnt();
  }

  public getVisionemnt(): void {
    this.communicationService
      .getVisionementInfo(this.film.numero)
      .subscribe((visionement: Visionement) => {
        if (visionement === null) {
          this.router.navigate(["acheter/", this.film.numero]);
        }
        this.visionement = visionement;
      });
  }

  public ngAfterViewInit(): void {
    if (this.visionement !== null) {
      this.matVideo.getVideoTag().setAttribute("src", this.film.html);
      this.matVideo.time = this.visionement.duree;
    }
  }

  public canDeactivate(): Observable<boolean> | boolean {
    if (this.visionement !== null) {
      this.communicationService
        .modifierVisionement(this.film, this.visionement, this.matVideo.time)
        .subscribe((observer) => {
          console.log(observer);
        });
    }

    return true;
  }
}
