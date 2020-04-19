import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Utilisateur } from "../../../common/tables/Utilisateur";
import { CommunicationService } from "./communication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  public title = "Netflix_poly";
  public route: string;
  public activeUser: Utilisateur;

  private subs: Subscription[] = [];

  public constructor(
    private communicationService: CommunicationService,
    location: Location,
    router: Router
  ) {
    this.subs.push(
      router.events.subscribe((val) => {
        location.path() !== ""
          ? (this.route = location.path())
          : (this.route = "");
      })
    );
    this.subs.push(
      this.communicationService.activeUser.subscribe((observer) => {
        this.activeUser = observer;
      })
    );
  }

  public ngOnInit(): void {
    // void
  }

  public logOut(): void {
    this.communicationService.logOut();
  }

  public ngOnDestroy(): void {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
