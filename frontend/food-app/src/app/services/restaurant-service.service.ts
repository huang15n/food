import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../common/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {

  restaurantURL = "http://localhost:8012/restaurants/items";
  constructor(private httpClient: HttpClient) { }

  getRestaurants(){
    return this.httpClient.get<Restaurant[]>(this.restaurantURL);
  }
}
