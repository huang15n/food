import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demand } from '../common/demand';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderLink = "http://localhost:8012/customers/orders";
  private deleOrderLink = "http://localhost:8012/customers/deleteOrders";

  private getRestaurantOrders = "http://localhost:8012/food/orders";

  private updateOrderStatus = "http://localhost:8012/food/order";

  constructor(private httpClient : HttpClient) {



   }
   getOrders(email: string): Observable<any>{
     return this.httpClient.get<Demand>(this.orderLink+`?email=${email}`);
      
  }

  deleteOrder(id: number) : Observable<any>{
    return this.httpClient.delete<Demand>(this.deleOrderLink+`?id=${id}`);
  }

  getRestaurant(id:number):Observable<any>{
    return this.httpClient.get<Demand>(this.getRestaurantOrders+`?foodId=${id}`);
  }
  upateOrder(id:number, status:string): Observable<any>{
    return this.httpClient.put<Demand>(this.updateOrderStatus+`/${id}`, {
            "status":status
    });
  }


}
