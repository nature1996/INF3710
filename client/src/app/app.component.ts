import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Utilisateur } from "../../../common/tables/Utilisateur";
import { CommunicationService } from "./communication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public title = "Netflix_poly";
  public route: string;
  public activeUser: Utilisateur;

  public constructor(private communicationService: CommunicationService, location: Location, router: Router) {
      router.events.subscribe((val) => {
          (location.path() !== "") ? this.route = location.path() : this.route = "";
        });
      this.communicationService.activeUser.subscribe((observer) => {
        this.activeUser = observer;
      });
  }

  public logOut(): void {
    this.communicationService.logOut();
  }
}
