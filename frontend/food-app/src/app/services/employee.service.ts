import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../common/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 

  private loginURL = "http://localhost:8012/customers/employeeLogin";

  constructor(private httpClient: HttpClient) { }


  verifyUserName( username: string): Observable<any>{
   return this.httpClient.get<Employee>(this.loginURL+`?username=${username}`);

  }
}
