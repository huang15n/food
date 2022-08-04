import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Food } from '../common/food';
import { Inject } from '@angular/core';
import { Category } from '../common/category';


@Injectable({
  providedIn: 'root'
})

export class FoodService {

  private baseUrl = "http://localhost:8012/food";
  private categoryUrl = `http://localhost:8012/category`;

  // behind the scene is the injectable 
  constructor(private  httpClient : HttpClient ) { }


 // this returns an obsevable map the json data from spring data REST to foood array 
  getFoodList(categoryId: number): Observable<Food[]>{

    const searchURL = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
  
    console.log("the search url is " + searchURL);

        return this.httpClient.get<GetResponseFood>(searchURL).pipe(
          map(response => response._embedded.food)
        );


  }

  searchFoodPaginate(thePage: number, thePageSize: number ,keyword: string) : Observable<GetResponseFood>{
    // need to build url based id, page and size
    const searchUrl = `${this.baseUrl}/search/findByfoodNameContaining?name=${keyword}`
    + `&page=${thePage}&size=${thePageSize}`;

    console.log("the search url is " + searchUrl);
    // spring data REST supports pagination out of the box, just send the parameters for page and size
    return this.httpClient.get<GetResponseFood>(searchUrl);
  }


  
  getFoodListPaginate(thePage: number, thePageSize: number ,categoryId: number) : Observable<GetResponseFood>{
    // need to build url based id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
    + `&page=${thePage}&size=${thePageSize}`;
    // spring data REST supports pagination out of the box, just send the parameters for page and size
    return this.httpClient.get<GetResponseFood>(searchUrl);
  }

  getCategories() : Observable<Category[]>{
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(map(response => response._embedded.category));
    
  }

  searchFood(keyword:string): Observable<Food[]>{
    const searchURL = `${this.baseUrl}/search/findByfoodNameContaining?name=${keyword}`;

    return this.httpClient.get<GetResponseFood>(searchURL).pipe(map(response => response._embedded.food));
  } 

  getFood(foodId:number): Observable<Food>{
    // need to build url based on the food id

    const foodUrl = `${this.baseUrl}/${foodId}`;
    return this.httpClient.get<Food>(foodUrl);
    // we do not need response => response._embedded 

  }





}

// adding supporting interface at the bottom 
// this helps us to unwrap the json from spring data REST _embedded entry 
interface GetResponseFood{
  _embedded:{
    food: Food[];
  },
  page: {
    size: number, // size of the page 
    totalElements: number; // grand total number of all elements in the datbase, but we are not returning all of the elemtns, just count for informational purposes only 
    totalPages : number, //  total pages available 
    number : number // current page number 
  }
}

interface GetResponseCategory{
  _embedded:{
    category: Category[];
  }
}




 