import { Component, OnInit } from "@angular/core";
import { Film } from "../../../../common/tables/Film";
import { CommunicationService } from "../communication.service";

const RESETFORM = {
  numero: null,
  titre: "",
  genre: "",
  dateProduction: null,
  duree: null,
  prix: null,
};

@Component({
  selector: "app-add-film",
  templateUrl: "./add-film.component.html",
  styleUrls: ["./add-film.component.css"],
})
export class AddFilmComponent implements OnInit {
  public constructor(private communicationService: CommunicationService) {}

  public films: Film[] = [];
  public montrerAjout: boolean;
  public formulaire: Film;

  public ngOnInit(): void {
    this.resetForm();
    this.getFilms();
    this.montrerAjout = false;
  }

  public getFilms(): void {
    this.communicationService.getFilms().subscribe((films: Film[]) => {
      this.films = films;
      console.log("Film loaded");
    });
  }

  public resetForm(): void {
    this.formulaire = RESETFORM;
  }

  public afficherAjouter(): void {
    this.montrerAjout = !this.montrerAjout;
  }

  public getAnnee(film: Film): string {
    let annee: string = "";
    annee += film.dateProduction;

    return annee;
  }

  public getPrix(film: Film): string {
    let prix: string = "";
    if (film.prix) {
      prix += film.prix + "$";
    }

    return prix;
  }

  public confirmFilm(): void {
    console.log(this.formulaire);
  }

  public modifierFilm(film: Film): void {
    this.montrerAjout = true;
    this.formulaire = { ...film };
  }

  public suprimerFilm(film: Film): void {
    console.log("supression du film:", film);
  }
}
