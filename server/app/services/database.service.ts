import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { schema } from "../createSchema";
import { data } from "../populateDB";

@injectable()
export class DatabaseService {
  // A MODIFIER POUR VOTRE BD
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "postgres",
    password: "123456",
    port: 5432,
    host: "127.0.0.1",
    keepAlive: true,
  };

  private pool: pg.Pool = new pg.Pool(this.connectionConfig);

  public constructor() {
    this.pool
      .connect()
      .then(async () => this.createSchema())
      .then(async () => this.populateDb())
      .catch();
  }
  /*

        METHODES DE DEBUG
    */
  public async createSchema(): Promise<pg.QueryResult> {
    return this.pool.query(schema);
  }

  public async populateDb(): Promise<pg.QueryResult> {
    return this.pool.query(data);
  }

  public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    return this.pool.query(`SELECT * FROM netflix_poly.${tableName};`);
  }

  // Film
  public async getFilms(): Promise<pg.QueryResult> {
    return this.pool.query(`SELECT * FROM netflix_poly.film;`);
  }

  public async getFilm(numero: number): Promise<pg.QueryResult> {
    return this.pool.query(
      `SELECT * FROM netflix_poly.film WHERE numero=\'${numero}\';`
    );
  }

  public async getOscars(noFilm: number): Promise<pg.QueryResult> {
    return this.pool.query(
      `SELECT * FROM netflix_poly.Oscars WHERE noFilm=\'${noFilm}\';`
    );
  }

  public async getRoles(noFilm: number): Promise<pg.QueryResult> {
    return this.pool.query(
      `SELECT p.nom, rf.roleName, rf.salaire
      FROM Netflix_Poly.personne p, Netflix_Poly.roleFilm rf
      WHERE rf.noFilm = \'${noFilm}\'
      AND   rf.personneID=p.personneID;`
    );
  }

  public async getVisionement(
    UID: number,
    noFilm: number
  ): Promise<pg.QueryResult> {
    return this.pool.query(
      `SELECT v.noFilm, v.dateVisionnement, v.duree, v.noCommande
      FROM netflix_poly.Commande c, netflix_poly.Visionnement v
      WHERE v.noFilm=\'${noFilm}\'
      AND c.UID=\'${UID}\'
      AND c.numero=v.noCommande;`
    );
  }

  // HOTEL
  public async createHotel(
    hotelNo: string,
    hotelName: string,
    city: string
  ): Promise<pg.QueryResult> {
    const values: string[] = [hotelNo, hotelName, city];
    const queryText: string = `INSERT INTO HOTELDB.Hotel VALUES($1, $2, $3);`;

    return this.pool.query(queryText, values);
  }

  // GUEST
  public async createGuest(
    guestNo: string,
    nas: string,
    guestName: string,
    gender: string,
    guestCity: string
  ): Promise<pg.QueryResult> {
    // this.pool.connect();
    const values: string[] = [guestNo, nas, guestName, gender, guestCity];
    const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

    return this.pool.query(queryText, values);
  }

  // BOOKING
  public async createBooking(
    hotelNo: string,
    guestNo: string,
    dateFrom: Date,
    dateTo: Date,
    roomNo: string
  ): Promise<pg.QueryResult> {
    const values: string[] = [
      hotelNo,
      guestNo,
      dateFrom.toString(),
      dateTo.toString(),
      roomNo,
    ];
    const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

    return this.pool.query(queryText, values);
  }
}
