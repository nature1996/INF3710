import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  public constructor(private communicationService: CommunicationService) { }

  public loginError: boolean;

  public ngOnInit(): void {
    this.communicationService.activeUser.subscribe((observer) => {
      this.loginError = observer == null;
      console.log(observer);
    });
    this.loginError = false;
  }

  public logIn(couriel: string, motDePasse: string): void {
    this.communicationService.logIn(couriel, motDePasse);
  }

}
