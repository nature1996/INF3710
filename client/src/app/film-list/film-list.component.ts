import { Component, OnInit } from "@angular/core";
import { Film } from "../../../../common/tables/Film";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-film-list",
  templateUrl: "./film-list.component.html",
  styleUrls: ["./film-list.component.css"],
})
export class FilmListComponent implements OnInit {
  public constructor(private communicationService: CommunicationService) {
    // void
  }

  public films: Film[] = [];

  public ngOnInit(): void {
    this.getFilms();
  }

  public getFilms(): void {
    this.communicationService.getFilms().subscribe((films: Film[]) => {
      this.films = films;
    });
  }

  public getDate(film: Film): string {
    const date = new Date(film.dateProduction);

    return date.toLocaleString().split(",", 1)[0];
  }

  public getPrix(film: Film): string {
    let prix: string = "";
    if (film.prix) {
      prix += film.prix + "$";
    }

    return prix;
  }
}
