import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  public constructor(private communicationService: CommunicationService) { }

  public ngOnInit(): void {
    // Todo
  }

}
