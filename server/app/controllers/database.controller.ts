import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { DatabaseService } from "../services/database.service";
import Types from "../types";

import { Film } from "../../../common/tables/Film";

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
            dateProduction: film.dateProduction,
            duree: film.duree,
            html: film.html,
            prix: film.prix,
          }));
          // todo: remove
          console.log(result.rows[1]);
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
              dateProduction: film.dateProduction,
              duree: film.duree,
              html: film.html,
              prix: film.prix,
            }));
            console.log(films);
            res.json(films[0]);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.get(
      "/hotel/hotelNo",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getHotelNo()
          .then((result: pg.QueryResult) => {
            const hotelPKs: string[] = result.rows.map(
              (row: any) => row.hotelno
            );
            res.json(hotelPKs);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

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

    router.delete("/hotel/insert" /*TODO*/);

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
