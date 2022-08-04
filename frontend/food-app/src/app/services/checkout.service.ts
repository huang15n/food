import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseURL = 'http://localhost:8012/checkout/purchase';

  constructor(private httpClient: HttpClient) {


   }

   placeOrder(purchase: Purchase) : Observable<any>{
     return this.httpClient.post<Purchase>(this.purchaseURL,purchase);
     

   }
}
