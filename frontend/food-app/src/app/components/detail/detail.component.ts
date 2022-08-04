import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/CartItem';
import { Food } from 'src/app/common/food';
import { FoodService } from 'src/app/services/food.service';
import { CartService } from 'src/app/services/CartService';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  food : Food = new Food();
  constructor(private foodService: FoodService, private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.handleFoodDetails();
    });

  }
  
  handleFoodDetails(){
    // get id a param string, convert string to a number using + symbol 
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.foodService.getFood(id).subscribe(
      data => {
        this.food = data;
      }
    )
  }

  addToCart(food: Food){
    const theCartItem = new CartItem(this.food);
    this.cartService.addToCart(theCartItem);
    
  }

}
