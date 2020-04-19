import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { DatabaseService } from "../services/database.service";
import Types from "../types";

import { RoleActeur } from "../../../common/request/RoleActeur";
import { Film } from "../../../common/tables/Film";
import { Oscar } from "../../../common/tables/Oscar";
import { Visionement } from "../../../common/tables/Visionement";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.post(
      "/createSchema",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .createSchema()
          .then((result: pg.QueryResult) => {
            res.json(result);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.post(
      "/populateDb",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .populateDb()
          .then((result: pg.QueryResult) => {
            res.json(result);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.get("/film", (req: Request, res: Response, next: NextFunction) => {
      // Send the request to the service and send the response
      this.databaseService
        .getFilms()
        .then((result: pg.QueryResult) => {
          const films: Film[] = result.rows.map((film: any) => ({
            numero: film.numero,
            titre: film.titre,
            genre: film.genre,
            dateProduction: film.dateproduction,
            duree: film.duree,
            html: film.lien,
            prix: film.prix,
          }));
          res.json(films);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });

    router.get(
      "/film/:numero",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getFilm(req.params.numero)
          .then((result: pg.QueryResult) => {
            const films: Film[] = result.rows.map((film: any) => ({
              numero: film.numero,
              titre: film.titre,
              genre: film.genre,
              dateProduction: film.dateproduction,
              duree: film.duree,
              html: film.lien,
              prix: film.prix,
            }));
            res.json(films[0]);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.get(
      "/oscars/:nofilm",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getOscars(req.params.nofilm)
          .then((result: pg.QueryResult) => {
            const oscars: Oscar[] = result.rows.map((oscar: any) => ({
              dateOscar: oscar.dateoscar,
              noFilm: oscar.nofilm,
              categorie: oscar.categorie,
              issue: oscar.issue,
            }));
            res.json(oscars);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.get(
      "/roles/:nofilm",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getRoles(req.params.nofilm)
          .then((result: pg.QueryResult) => {
            const roles: RoleActeur[] = result.rows.map((role: any) => ({
              nom: role.nom,
              role: role.rolename,
              salaire: role.salaire,
            }));
            res.json(roles);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.get(
      "/visionnement/:UID/:filmID",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getVisionement(req.params.UID, req.params.filmID)
          .then((result: pg.QueryResult) => {
            const visionement: Visionement[] = result.rows.map((cmd: any) => ({
              noFilm: cmd.nofilm,
              dateVisionement: cmd.datevisionnement,
              duree: cmd.duree,
              noCommande: cmd.nocommande,
            }));
            res.json(visionement[0]);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.post(
      "/user/insert",
      // tslint:disable-next-line: max-func-body-length
      (req: Request, res: Response, next: NextFunction) => {
        const noRue: string = req.body.adresse.noRue;
        const nomRue: string = req.body.adresse.nomRue;
        const Ville: string = req.body.adresse.Ville;
        const codePostal: string = req.body.adresse.codePostal;
        const Province: string = req.body.adresse.Province;
        const pays: string = req.body.adresse.pays;
        const motDePasse: string = req.body.utilisateur.motDePasse;
        const nom: string = req.body.utilisateur.nom;
        const courrier: string = req.body.utilisateur.courrier;
        const membre: string = req.body.utilisateur.membre;
        const prixAbonement: string = req.body.membre.prixAbonement;
        const dateDebut: string = req.body.membre.dateDebut;
        const dateEcheance: string = req.body.membre.dateEcheance;
        this.databaseService
          .createUtilisateur(
            noRue,
            nomRue,
            Ville,
            codePostal,
            Province,
            pays,
            motDePasse,
            nom,
            courrier,
            membre,
            prixAbonement,
            dateDebut,
            dateEcheance
          )
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.post(
      "/film/insert",
      (req: Request, res: Response, next: NextFunction) => {
        const titre: string = req.body.titre;
        const genre: string = req.body.genre;
        const dateProduction: string = req.body.dateProduction;
        const duree: string = req.body.duree;
        const html: string = req.body.html;
        const prix: string = req.body.prix;
        this.databaseService
          .createFilm(titre, genre, dateProduction, duree, html, prix)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.post(
      "/film/modify",
      (req: Request, res: Response, next: NextFunction) => {
        const numero: string = req.body.numero;
        const titre: string = req.body.titre;
        const genre: string = req.body.genre;
        const dateProduction: string = req.body.dateProduction;
        const duree: string = req.body.duree;
        const html: string = req.body.html;
        const prix: string = req.body.prix;
        this.databaseService
          .modifyFilm(numero, titre, genre, dateProduction, duree, html, prix)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.post(
      "/visionnement/modify",
      (req: Request, res: Response, next: NextFunction) => {
        const noFilm: string = req.body.visionement.noFilm;
        const noCommande: string = req.body.visionement.noCommande;
        const duree: string = req.body.duree;
        this.databaseService
          .modifyVisionnement(noFilm, noCommande, duree)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    // Hotel

    router.post(
      "/hotel/insert",
      (req: Request, res: Response, next: NextFunction) => {
        const hotelNo: string = req.body.hotelNo;
        const hotelName: string = req.body.hotelName;
        const city: string = req.body.city;
        this.databaseService
          .createHotel(hotelNo, hotelName, city)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    // router.delete("/hotel/insert" void);

    router.get(
      "/tables/:tableName",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getAllFromTable(req.params.tableName)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    return router;
  }
}
