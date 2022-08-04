import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../common/customer';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginURL = "http://localhost:8012/customers/login";

  constructor(private httpClient: HttpClient) { }


  verifyUserName( username: string): Observable<any>{
   return this.httpClient.get<Customer>(this.loginURL+`?username=${username}`);

  }
}
