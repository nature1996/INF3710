import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CommunicationService } from "./communication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public title = "Netflix_poly";
  public route: string;

  public constructor(private communicationService: CommunicationService, location: Location, router: Router) {
      router.events.subscribe((val) => {
          (location.path() !== "") ? this.route = location.path() : this.route = "";
        });
  }
}
