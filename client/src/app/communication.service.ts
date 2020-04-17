import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { concat, of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

import { RoleActeur } from "../../../common/request/RoleActeur";
import { Film } from "../../../common/tables/Film";
import { Oscar } from "../../../common/tables/Oscar";

import {films, oscarsFilm, rolesFilm} from "./temp-const";

// tslint:disable: no-any

@Injectable()
export class CommunicationService {

    // TODO: remove when linked
    private _films: Observable<Film[]> = new Observable( (observer) => {
        observer.next(films);
    });
    // end

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    private _listners: any = new Subject<any>();

    public listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public filter(filterBy: string): void {
       this._listners.next(filterBy);
    }

    public encript(motDePasse: string): string {
        // TODO: add encription
        return motDePasse;
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

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
