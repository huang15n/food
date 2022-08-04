import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/CartItem';
import { CartService } from 'src/app/services/CartService';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice : number = 0;
  totalQuantity : number = 0;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }


  listCartDetails(){
    this.cartItems = this.cartService.cartItem;

    this.cartService.totalPrice.subscribe(
      data => {this.totalPrice = data; this.totalPrice = +this.totalPrice.toFixed(2);}
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data

    );

    this.cartService.computeTotals();
  }

  incrementQuantity(cartItem: CartItem){
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: CartItem){
    if(cartItem.quantity > 0){
    cartItem.quantity--;
    } 

    if(cartItem.quantity === 0){
      this.remove(cartItem);
    }else{
      this.cartService.computeTotals();

    }
  }

  remove(cartItem: CartItem){

    const index = this.cartItems.findIndex(item => item.foodId == cartItem.foodId);
    if(index > -1){
      this.cartItems.splice(index,1);
      this.cartService.computeTotals();
    }

  }

}
