import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppylandFormService {

  constructor() { }





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
