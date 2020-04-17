import { RoleActeur } from "../../../common/request/RoleActeur";
import {Film} from "../../../common/tables/Film";
import { Oscar } from "../../../common/tables/Oscar";

export const films: Film[] = [
    {
        "numero" : 0,
        "titre" : "le premier",
        "genre" : "test",
        "dateProduction" : 10,
        "duree" : 190,
    },
    {
        "numero" : 1,
        "titre" : "le deuxième",
        "genre" : "testing",
        "dateProduction" : 11,
        "duree" : 190,
        "prix" : 10.28,
    }
];

export const rolesFilm: RoleActeur[] = [
    {
        "nom" : "Marie Jolly",
        "role" : "Productrice",
        "salaire" : 100000,
    },
    {
        "nom" : "Jean Durocher",
        "role" : "Réalisateur",
        "salaire" : 100000,
    }
];

export const oscarsFilm: Oscar[] = [
    {
        "dateOscar" : 2018,
        "noFilm" : 1,
        "categorie" : "meilleur film",
        "issue" : "victoire",
    }
];
