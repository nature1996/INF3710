import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public constructor(
    private communicationService: CommunicationService,
    private router: Router
  ) {}

  public loginError: boolean;

  public ngOnInit(): void {
    this.communicationService.activeUser.subscribe((observer) => {
      if (observer !== null) {
        this.router.navigate(["films_list/"]);
      }
      this.loginError = observer === null;
    });
    this.loginError = false;
  }

  public logIn(couriel: string, motDePasse: string): void {
    this.communicationService.logIn(couriel, motDePasse);
  }
}
