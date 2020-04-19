import { RoleActeur } from "../../../common/request/RoleActeur";
import { Visionement } from "../../../common/request/Visionement";
import { Film } from "../../../common/tables/Film";
import { Oscar } from "../../../common/tables/Oscar";
import { Utilisateur } from "../../../common/tables/Utilisateur";

export const films: Film[] = [
  {
    numero: 0,
    titre: "le premier",
    genre: "test",
    dateProduction: new Date("2013-01-05"),
    duree: 190,
    html: "http://static.videogular.com/assets/videos/videogular.mp4",
  },
  {
    numero: 1,
    titre: "le deuxième",
    genre: "testing",
    dateProduction: new Date("2018-01-23"),
    duree: 190,
    html: "http://static.videogular.com/assets/videos/videogular.mp4",
    prix: 10.28,
  },
];

export const rolesFilm: RoleActeur[] = [
  {
    nom: "Marie Jolly",
    role: "Productrice",
    salaire: 100000,
  },
  {
    nom: "Jean Durocher",
    role: "Réalisateur",
    salaire: 100000,
  },
];

export const oscarsFilm: Oscar[] = [
  {
    dateOscar: 2018,
    noFilm: 1,
    categorie: "meilleur film",
    issue: "victoire",
  },
];

export const tempUser: Utilisateur = {
  UID: 0,
  courrier: "nature1996@polymtl.ca",
  motDePasse: "123456",
  nom: "Nt6 19",
  membre: true,
  idAdresse: 0,
};

export const visionement0: Visionement = {
  duree: 12,
};
