import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
// tslint:disable-next-line:ordered-imports
import {
  concat,
  observable,
  of,
  BehaviorSubject,
  Observable,
  Subject,
} from "rxjs";
import { catchError } from "rxjs/operators";

import { RoleActeur } from "../../../common/request/RoleActeur";
import { Adresse } from "../../../common/tables/Adresse";
import { Film } from "../../../common/tables/Film";
import { Oscar } from "../../../common/tables/Oscar";
import { Utilisateur } from "../../../common/tables/Utilisateur";
import { Visionement } from "../../../common/tables/Visionement";

import { tempUser } from "./temp-const";

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
    new Observable<Utilisateur>((observer) => {
      observer.next(
        couriel === "nature1996@polymtl.ca" && motDePasse === "123456"
          ? tempUser
          : null
      );
    }).subscribe((observer) => {
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
          { UID: this._activeUser.getValue().UID, filmID: filmID }
      )
      .pipe(catchError(this.handleError<Visionement>("oscars/:nofilm")));
  }

  public insertUtilisateur(
    utilisateur: Utilisateur,
    adresse: Adresse
  ): Observable<number> {
    return new Observable<number>((observer) => {
      observer.next(1);
    });
  }

  public insertFilm(film: Film): Observable<number> {
    return new Observable<number>((observer) => {
      observer.next(1);
    });
  }

  public insertCommandVisionement(
    utilisateur: Utilisateur,
    filmID: number
  ): Observable<number> {
    return new Observable<number>((observer) => {
      observer.next(1);
    });
  }

  public modifierFilm(film: Film): Observable<number> {
    return new Observable<number>((observer) => {
      observer.next(1);
    });
  }

  public modifierVisionement(
    film: Film,
    visionement: Visionement,
    duree: number
  ): Observable<number> {
    console.log(duree);

    return new Observable<number>((observer) => {
      observer.next(1);
    });
  }

  public deleteFilm(filmID: number): Observable<number> {
    return new Observable<number>((observer) => {
      observer.next(1);
    });
  }

  /* public getHotels(): Observable<any[]> {

        return this.http.get<Hotel[]>(this.BASE_URL + "/hotel").pipe(
            catchError(this.handleError<Hotel[]>("getHotels")),
        );
    }

    public getHotelPKs(): Observable<string[]> {

        return this.http.get<string[]>(this.BASE_URL + "/hotel/hotelNo").pipe(
            catchError(this.handleError<string[]>("getHotelPKs")),
        );
    }

    public insertHotel(hotel: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/hotel/insert", hotel).pipe(
            catchError(this.handleError<number>("inserHotel")),
        );
    }

    public insertRoom(room: Room): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/rooms/insert", room).pipe(
            catchError(this.handleError<number>("inserHotel")),
        );
    }

    public deleteHotel(): void {
      // todo
    }

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    } */

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
