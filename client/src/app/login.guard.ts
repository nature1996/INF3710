import { Injectable, OnDestroy } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { Utilisateur } from "../../../common/tables/Utilisateur";
import { CommunicationService } from "./communication.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate, OnDestroy {
  public constructor(
    private communicationService: CommunicationService,
    private router: Router
  ) {
    this.sub = this.communicationService.activeUser.subscribe((value) => {
      this.activeUser = value;
    });
  }
  private activeUser: Utilisateur;
  private sub: Subscription;

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

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
