import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class CountryStateServiceService {
  private countriesURL = "http://localhost:8012/countries";
  private stateURL = "http://localhost:8012/state";

  constructor(private httpClient: HttpClient) { }

  getCountries():Observable<Country[]>{
    console.log(this.countriesURL);
    return this.httpClient.get<GetResponseCountries>(this.countriesURL).pipe(
      map(response => response._embedded.countries)
        );
      // returns an observable map the json data from spring data REST to country array 
  }

  getStates(theCountryCode: string): Observable<State[]>{
    const searchStateURL = `${this.stateURL}/search/findByCountryCode?code=${theCountryCode}`;

    console.log(searchStateURL);
  return this.httpClient.get<GetResponseStates>(searchStateURL).pipe(
    map(response => response._embedded.state)
  );
  }


}

interface GetResponseCountries{
  _embedded:{
    countries:Country[];
  }
  
}
interface GetResponseStates{
  _embedded:{
    state: State[];
  }
}

// returns an observable map the json data from spring data rest to array 

