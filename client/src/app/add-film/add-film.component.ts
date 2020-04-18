import { Component, OnInit } from "@angular/core";
import { Film } from "../../../../common/tables/Film";
import { CommunicationService } from "../communication.service";

const RESETFORM = {
  numero: null,
  titre: "",
  genre: "",
  dateProduction: null,
  duree: null,
  html: "",
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
  public formulaire: Film;

  public montrerAjout: boolean;
  public isValidID: boolean = true;
  public invalidFilm: boolean = false;

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
    if (this.formulaire.numero == null) {
      this.communicationService.insertFilm(this.formulaire).subscribe(() => {
        this.getFilms();
      });
    } else {
      this.communicationService.modifierFilm(this.formulaire).subscribe(() => {
        this.getFilms();
      });
    }
  }

  public modifierFilm(film: Film): void {
    this.montrerAjout = true;
    this.formulaire = { ...film };
  }

  public suprimerFilm(film: Film): void {
    this.communicationService.deleteFilm(film.numero).subscribe((observer) => {
      console.log(observer);
      this.getFilms();
    });
  }

  public verifierID(): void {
    this.isValidID =
      this.formulaire.numero == null ||
      this.films.findIndex((value: Film) => {
        return value.numero === this.formulaire.numero;
      }) !== -1;
  }
}
