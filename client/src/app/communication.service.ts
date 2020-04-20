import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// tslint:disable-next-line:ordered-imports
import { BehaviorSubject, Observable, Subject, of } from "rxjs";
import { catchError } from "rxjs/operators";

import { RoleActeur } from "../../../common/request/RoleActeur";
import { Adresse } from "../../../common/tables/Adresse";
import { Film } from "../../../common/tables/Film";
import { Membre } from "../../../common/tables/Membre";
import { Oscar } from "../../../common/tables/Oscar";
import { Utilisateur } from "../../../common/tables/Utilisateur";
import { Visionement } from "../../../common/tables/Visionement";

// tslint:disable: no-any

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient, private router: Router) {}

  private _listners: any = new Subject<any>();

  private _activeUser: any = new BehaviorSubject<Utilisateur>(null);

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public get activeUser(): Observable<Utilisateur> {
    return this._activeUser.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  public logIn(couriel: string, motDePasse: string): void {
    this.http
      .post<Film[]>(this.BASE_URL + "/login", { couriel, motDePasse })
      .pipe(catchError(this.handleError<Film[]>("getFilms")))
      .subscribe((observer) => {
        this._activeUser.next(observer);
      });
  }

  public logOut(): void {
    this._activeUser.next(null);
    this.router.navigate(["login/"]);
  }

  public getFilms(): Observable<any[]> {
    return this.http
      .get<Film[]>(this.BASE_URL + "/film")
      .pipe(catchError(this.handleError<Film[]>("getFilms")));
  }

  public getFilmDetail(id: number): Observable<any> {
    return this.http
      .get<Film>(this.BASE_URL + "/film/" + id)
      .pipe(catchError(this.handleError<Film>("getFilm/:number")));
  }

  public getRoleFilm(filmID: number): Observable<any> {
    return this.http
      .get<RoleActeur[]>(this.BASE_URL + "/roles/" + filmID)
      .pipe(catchError(this.handleError<RoleActeur[]>("roles/:nofilm")));
  }

  public getOscarFilm(filmID: number): Observable<any> {
    return this.http
      .get<Oscar[]>(this.BASE_URL + "/oscars/" + filmID)
      .pipe(catchError(this.handleError<Oscar[]>("oscars/:nofilm")));
  }

  public getVisionnementInfo(filmID: number): Observable<Visionement> {
    return this.http
      .get<Visionement>(
        this.BASE_URL +
          "/visionnement/" +
          this._activeUser.getValue().UID +
          "/" +
          filmID
      )
      .pipe(catchError(this.handleError<Visionement>("oscars/:nofilm")));
  }

  public insertUtilisateur(
    utilisateur: Utilisateur,
    adresse: Adresse,
    membre: Membre
  ): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/user/insert", {
        utilisateur: utilisateur,
        adresse: adresse,
        membre: membre,
      })
      .pipe(catchError(this.handleError<number>("insertUtilisateur")));
  }

  public insertFilm(film: Film): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/film/insert", film)
      .pipe(catchError(this.handleError<number>("insertFilm")));
  }

  public insertCommandVisionement(filmID: number): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/visionnement/insert", {
        filmID,
        UID: this._activeUser.getValue().UID,
      })
      .pipe(
        catchError(
          this.handleError<number>("insertUtilisateurCommandVisionement")
        )
      );
  }

  public modifierFilm(film: Film): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/film/modify", film)
      .pipe(catchError(this.handleError<number>("modifierFilm")));
  }

  public modifierVisionement(
    visionement: Visionement,
    duree: number
  ): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/visionnement/modify", {
        visionement,
        duree,
      })
      .pipe(catchError(this.handleError<number>("modifierVisionnement")));
  }

  public deleteFilm(filmID: number): Observable<any> {
    return this.http
      .delete<number>(this.BASE_URL + "/film/" + filmID)
      .pipe(catchError(this.handleError<number>("deleteFilm")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
