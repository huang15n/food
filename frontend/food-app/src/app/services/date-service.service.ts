import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {

  constructor() { }

  getCreditCardMonths(startMonth: number) : Observable<number[]>{
    let data : number[] = [];
    for(let theMonth = startMonth; theMonth <= 12; theMonth ++){
      data.push(theMonth);
    }
    return of(data);
  };


  getCreditCardYears(): Observable<number[]>{
    let data: number [] = [];
    const startYear: number = 2020;
    const endYear: number = startYear + 20;

    for(let theYear = startYear; theYear < endYear; theYear ++){
      data.push(theYear);
      
    }
    return of(data);

  }


}
