import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/CartItem';
import { Food } from 'src/app/common/food';
import { CartService } from 'src/app/services/CartService';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {


  // a bit house keeping 
  foods : Food[] = [];
  currentCategoryId : number = 1;
  previousCategoryId : number = 1;
  searchMode : boolean = false;


  // new propery for pagination 
  thePageNumber : number = 1;
  thePageSize: number = 3;
  theTotalElements : number = 0;


  previousKeyword : string;


  constructor(private foodService : FoodService, private cartService: CartService, private route : ActivatedRoute) { }

  // similar to @PostContruct in spring 
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listFood();

    });
  }

  listFood(){
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    // keyword comes from {path:"search:keyword", component: Food}
    // this.router.navigateByUrl(`/search/${value}`)
    if(this.searchMode){
      this.handleSearchFood();
    }else{
      
    this.handleListFood();
    // keep the flow going 

    }


  }

  handleSearchFood(){
    const keyword: string = this.route.snapshot.paramMap.get("keyword")!;
    // now search for food 
    

    // if we have a diffrent keyword than previous 
    // then set the page number to 1 

    if(this.previousKeyword != keyword){
      this.thePageNumber = 1;

    }
    this.previousKeyword = keyword;


   // console.log(`keyword = ${keyword} , the page number = ${this.thePageNumber}`);





   // now search for the produt using keyword 
    this.foodService.searchFoodPaginate(
      this.thePageNumber -= 1,
      this.thePageSize,
      keyword
    ).subscribe(this.processResult());

  }

  handleListFood(){
    // check if id parameter is avaialbel 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");

    if(hasCategoryId){
      //get the id para string, convert string to a number using + 
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
 
    }else{
      // no available category id
     
      this.currentCategoryId = 1;
    }

    // check if we have a different than previous 
    // note: angular will reuse a component if it is currently being view 
    // if we have a different category id than previous than set the page number back to 1 

    if(this.previousCategoryId != this.currentCategoryId){
       this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


    // swing to service now get the products for the given category id 
    this.foodService.getFoodListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(this.processResult());
    
  }

  processResult(){
    return (data: { _embedded: { food: Food[]; }; page: { number: number; size: number; totalElements: number; }; })  => {
      this.foods = data._embedded.food;
      this.thePageNumber = data.page.number + 1;
      // spring data rest pages are 0 based code should resemble what we have here 
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
      // left hand side of assignment are properties defined in this class 

    } ;
  }


  updatePageSize(event: Event){
    this.thePageSize = +(event.target as HTMLInputElement).value;
    this.thePageNumber = 1;
    this.listFood();
  }

  addToCart(food:Food){
    console.log(`adding to cart ${food.foodName} ${food.price}`);
    const theCartItem = new CartItem(food);
    

    this.cartService.addToCart(theCartItem); // it calls cart service 
    

    

  }


}
