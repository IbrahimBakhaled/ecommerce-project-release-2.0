import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Country} from "../common/country";
import {map} from "rxjs/operators";
import {State} from "../common/state";

@Injectable({
  providedIn: 'root'
})
export class ShoppylandFormService {


  // pays & regions urls
  private countriesUrl = 'http://localhost:8080/api/countries';
  private stateUrl = 'http://localhost:8080/api/states';



  // injecte httpClient dans le constructeur
  constructor( private httpClient : HttpClient) { }


getCountries() : Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
}

getStates(theCountryCode : string): Observable<State[]>{

    //chercher url
  const searchStatesurl = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`;

  return this.httpClient.get<GetResponseStates>(searchStatesurl).pipe(
    map(response => response._embedded.states)
  );
}


  getCreditCardMonths (startMonth : number) : Observable<number[]>{


    let data:number [] = [];

    // cree une liste pour les mois
    // en va commencé par le mois actuel



    for (let  theMonth = startMonth;
              theMonth <=12;
              theMonth++){

      data.push(theMonth);
    }
    return of (data);            // the "of" operator will wrap an object as an observable
                                // our angular component will subscribe to this method to recieve all this async data
  }

  getCreditCardYears(): Observable<number[]>{
    let data : number  []= [];

    // cree une liste pour les annees
    // en va commencé par l'annee actuel et apres en va bouclé pour 10 annees suivants

    const startYear: number = new Date().getFullYear();  //get the cyrrent year
    const endYear: number = startYear +10;

    for (let theYear = startYear ; theYear <=endYear; theYear++){
        data.push(theYear);   // adding theYear to the array
    }

    return of (data);

  }
}

//Unwraps the JSON from Spring Data Rest
interface  GetResponseCountries {
  _embedded : {
    countries: Country[];
  }

}

interface GetResponseStates{
  _embedded: {
    states : State[];
  }
}
