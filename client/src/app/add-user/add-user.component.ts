import { Component, OnInit } from "@angular/core";

import { Adresse } from "../../../../common/tables/Adresse";
import { Membre } from "../../../../common/tables/Membre";
import { Utilisateur } from "../../../../common/tables/Utilisateur";
import { CommunicationService } from "../communication.service";

const RESETFORM1: Utilisateur = {
  UID: null,
  motDePasse: "",
  nom: "",
  courrier: "",
  idAdresse: null,
  membre: false,
};

const RESETFORM2: Adresse = {
  idAdresse: null,
  noRue: "",
  nomRue: "",
  Ville: "",
  codePostal: "",
  Province: "",
  pays: "",
};

const RESETFORM3: Membre = {
  UID: null,
  prixAbonement: 0,
  dateDebut: "",
  dateEcheance: "",
};

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  public formulaire1: Utilisateur;
  public formulaire2: Adresse;
  public formulaire3: Membre;

  public constructor(private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.resetForm();
  }

  public resetForm(): void {
    this.formulaire1 = RESETFORM1;
    this.formulaire2 = RESETFORM2;
    this.formulaire3 = RESETFORM3;
  }

  public confirmUser(): void {
    this.communicationService
      .insertUtilisateur(this.formulaire1, this.formulaire2)
      .subscribe((observer) => {
        console.log(observer);
      });
  }
}
