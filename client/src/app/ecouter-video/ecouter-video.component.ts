import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit,
  ElementRef,
} from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";

import { MatVideoComponent } from "mat-video/lib/video.component";
import { Visionement } from "../../../../common/request/Visionement";
import { Utilisateur } from "../../../../common/tables/Utilisateur";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-ecouter-video",
  templateUrl: "./ecouter-video.component.html",
  styleUrls: ["./ecouter-video.component.css"],
})
export class EcouterVideoComponent implements OnInit, AfterViewInit {
  @ViewChild("video") matVideo: MatVideoComponent;
  @ViewChild("videoSrc") videoSrc: ElementRef;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communicationService: CommunicationService,
    private renderer: Renderer2
  ) {}

  public activeUser: Utilisateur;
  public visionement: Visionement;

  public vid: string;

  public ngOnInit(): void {}
  /* public ngAfterViewInit(): void {
    this.communicationService.activeUser.subscribe((activeUser) => {
      this.activeUser = activeUser;
    });

    this.vid = "http://static.videogular.com/assets/videos/videogular.mp4";
    this.matVideo
      .getVideoTag()
      .setAttribute(
        "src",
        "http://static.videogular.com/assets/videos/videogular.mp4"
      );
  } */
  public ngAfterViewInit(): void {
    this.communicationService.activeUser.subscribe((activeUser) => {
      this.activeUser = activeUser;
    });
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.communicationService.getVisionementInfo(
            parseInt(params.get("filmID"), 10)
          )
        )
      )
      .subscribe((visionement: Visionement) => {
        this.visionement = visionement;
        if (this.visionement !== null) {
          this.videoSrc.nativeElement.setAttribute(
            "src",
            this.visionement.html
          );
          this.matVideo
            .getVideoTag()
            .setAttribute("src", this.visionement.html);
          this.matVideo.time = this.visionement.duree;
          console.log(this.matVideo.getVideoTag());
        }
      });
  }

  public saveTime(): void {
    console.log("test1");
  }
}
