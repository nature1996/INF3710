import CryptoJS = require("crypto-js");
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

  public async login(
    courrier: string,
    motDePasse: string
  ): Promise<pg.QueryResult> {
    return this.pool.query(
      `SELECT *
      FROM netflix_poly.Utilisateur
      WHERE courrier=\'${courrier}\'
      AND motDePasseCrypte=\'${CryptoJS.SHA256(motDePasse).toString(
        CryptoJS.enc.Hex
      )}\'
      ;`
    );
  }

  public async createUtilisateur(
    noRue: string,
    nomRue: string,
    ville: string,
    codePostal: string,
    // tslint:disable-next-line: variable-name
    Province: string,
    pays: string,
    motDePasse: string,
    nom: string,
    courrier: string,
    membre: string,
    prixAbonement: string,
    dateDebut: string,
    dateEcheance: string
  ): Promise<pg.QueryResult> {
    const values: string[] = [
      noRue,
      nomRue,
      ville,
      codePostal,
      Province,
      pays,
      CryptoJS.SHA256(motDePasse).toString(CryptoJS.enc.Hex),
      nom,
      courrier,
      membre,
      prixAbonement,
      dateDebut,
      dateEcheance,
    ];
    const queryText: string = `
       SELECT netflix_poly.insererUtilisateur($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
    `;

    return this.pool.query(queryText, values);
  }

  public async createFilm(
    titre: string,
    genre: string,
    dateProduction: string,
    duree: string,
    html: string,
    prix: string
  ): Promise<pg.QueryResult> {
    const values: string[] = [titre, genre, dateProduction, duree, prix, html];
    const queryText: string = `INSERT INTO netflix_poly.film (titre, genre, dateProduction, duree, prix, lien)
     VALUES($1, $2, $3, $4, $5, $6);`;

    return this.pool.query(queryText, values);
  }

  public async createVisionnement(
    filmNo: string,
    UID: string
  ): Promise<pg.QueryResult> {
    const values: string[] = [];
    const queryText: string = `SELECT netflix_poly.insererVisionnement(\'${filmNo}\', \'${UID}\');`;

    return this.pool.query(queryText, values);
  }

  public async modifyFilm(
    numero: string,
    titre: string,
    genre: string,
    dateProduction: string,
    duree: string,
    html: string,
    prix: string
  ): Promise<pg.QueryResult> {
    const values: string[] = [
      numero,
      titre,
      genre,
      dateProduction,
      duree,
      prix,
      html,
    ];
    const queryText: string = `UPDATE netflix_poly.film
    SET titre = $2, genre = $3, dateProduction = $4, duree = $5, prix = $6, lien = $7
    WHERE numero = $1;`;

    return this.pool.query(queryText, values);
  }

  public async modifyVisionnement(
    noFilm: string,
    noCommande: string,
    duree: string
  ): Promise<pg.QueryResult> {
    const values: string[] = [noFilm, noCommande, duree];
    const queryText: string = `UPDATE netflix_poly.Visionnement
    SET duree = $3
    WHERE noFilm = $1 AND noCommande = $2`;

    return this.pool.query(queryText, values);
  }

  public async deleteFilm(filmID: number): Promise<pg.QueryResult> {
    return this.pool.query(`SELECT netflix_poly.deleteFilm(\'${filmID}\');`);
  }
}
