import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
import { Visionement } from "../../../common/request/Visionement";
import { Film } from "../../../common/tables/Film";
import { Oscar } from "../../../common/tables/Oscar";
import { Utilisateur } from "../../../common/tables/Utilisateur";

import {
  films,
  oscarsFilm,
  rolesFilm,
  tempUser,
  visionement0,
} from "./temp-const";

// tslint:disable: no-any

@Injectable()
export class CommunicationService {
  // TODO: remove when linked
  private _films: Observable<Film[]> = new Observable((observer) => {
    observer.next(films);
  });
  // end

  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listners: any = new Subject<any>();

  private _activeUser: any = new BehaviorSubject<Utilisateur>(null);

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public get activeUser(): Observable<any> {
    return this._activeUser.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  private encript(motDePasse: string): string {
    // TODO: add encription
    return motDePasse;
  }

  public logIn(couriel: string, motDePasse: string): void {
    new Observable<Utilisateur>((observer) => {
      observer.next(
        couriel === "nature1996@polymtl.ca" &&
          this.encript(motDePasse) === "123456"
          ? tempUser
          : null
      );
    }).subscribe((observer) => {
      this._activeUser.next(observer);
    });
  }

  public logOut(): void {
    this._activeUser.next(null);
  }

  public getFilms(): Observable<any[]> {
    return this._films;
  }

  public getFilmDetail(id: number): Observable<any> {
    return new Observable<Film>((observer) => {
      observer.next(films[id]);
    });
  }

  public getRoleFilm(filmID: number): Observable<any> {
    return new Observable<RoleActeur[]>((observer) => {
      observer.next(rolesFilm);
    });
  }

  public getOscarFilm(filmID: number): Observable<any> {
    return new Observable<Oscar[]>((observer) => {
      observer.next(oscarsFilm);
    });
  }

  public getVisionementInfo(
    filmID: number // UID from this._activeUser.getValue().UID
  ): Observable<Visionement> {
    return new Observable<Visionement>((observer) => {
      if (filmID === 0) {
        observer.next(visionement0);
      } else {
        observer.next(null);
      }
    });
  }

  public insertFilm(film: Film): Observable<number> {
    return new Observable<number>((observer) => {
      observer.next(1);
    });
  }

  public modifierFilm(film: Film): Observable<number> {
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
