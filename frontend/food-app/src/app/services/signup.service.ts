import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../common/customer';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private customerURL = 'http://localhost:8012/customers/signup';



  constructor(private httpClient: HttpClient) { 

  }

  addCustomer(customer: Customer) : Observable<any>{
    return this.httpClient.post<Customer>(this.customerURL,customer);
 
    

  }



}
