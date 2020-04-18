import { Component, OnInit } from "@angular/core";
import { Utilisateur } from "../../../../common/tables/Utilisateur";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-ecouter-video",
  templateUrl: "./ecouter-video.component.html",
  styleUrls: ["./ecouter-video.component.css"],
})
export class EcouterVideoComponent implements OnInit {
  public constructor(private communicationService: CommunicationService) {}

  public activeUser: Utilisateur;

  public ngOnInit(): void {
    this.communicationService.activeUser.subscribe((activeUser) => {
      this.activeUser = activeUser;
    });
  }
}
