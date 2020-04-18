import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { DatabaseService } from "../services/database.service";
import Types from "../types";

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
