import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../common/employee';
import { Food } from '../common/food';
import { Owner } from '../common/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

 
  private loginURL = "http://localhost:8012/customers/ownerLogin";

  private fireUrl = "http://localhost:8012/owner/fireEmployee";

  private hireUrl = "http://localhost:8012/owner/hireEmployee";


  private menuURL = "http://localhost:8012/owner/createFood";


  private foodURL = "http://localhost:8012/owner/foodList";

  private deleteFoodURL = "http://localhost:8012/owner/deleteFood";

  constructor(private httpClient: HttpClient) { }


  verifyUserName( username: string):Observable<any>{
   return this.httpClient.get<Owner>(this.loginURL+`?username=${username}`);

  }

  fireEmployee(id:number) : Observable<any>{
    return this.httpClient.delete<Employee>(this.fireUrl+`?employeeId=${id}`);
  }

  hireEmployee( restaurantId: number, ownerId: number, employee: Employee) : Observable<any>{
    return this.httpClient.post<Employee>(this.hireUrl+`?restaurantId=${restaurantId}&ownerId=${ownerId}`, employee);
  }

  createMenu(categoryId:number,restaurantId: number,  food: Food) : Observable<any>{
    return this.httpClient.post<Food>(this.menuURL+`?categoryId=${categoryId}&restaurantId=${restaurantId}`,food);
  }

  foodList(restaurantId:number): Observable<any>{
    return this.httpClient.get<Food>(this.foodURL+`?restaurantid=${restaurantId}`);
  }

  deleteFood(id:number) : Observable<any>{
    return this.httpClient.delete<Food>(this.deleteFoodURL+`?foodId=${id}`);
  }



}
