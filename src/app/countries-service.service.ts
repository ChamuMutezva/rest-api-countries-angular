import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CountriesInterface } from './countries-interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesServiceService {
  private url = 'https://restcountries.eu/rest/v2/all';


  constructor(private http: HttpClient) { }
  /*
  getCountries(): Observable<CountriesInterface[]> {
    return this.http.get<CountriesInterface[]>(this.url);
  } */

  getCountries(): Observable<CountriesInterface[]> {
    return this.http.get<CountriesInterface[]>(this.url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.log(error);
        return of(result as T)
    }
 } 


}
