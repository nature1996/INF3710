import { Injectable, OnInit } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Utilisateur } from "../../../common/tables/Utilisateur";
import { CommunicationService } from "./communication.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  public constructor(
    private communicationService: CommunicationService,
    private router: Router
  ) {
    this.communicationService.activeUser.subscribe((value) => {
      this.activeUser = value;
    });
  }
  private activeUser: Utilisateur;

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.activeUser === null) {
      this.router.navigate(["login/"]);

      return false;
    }

    return true;
  }
}
