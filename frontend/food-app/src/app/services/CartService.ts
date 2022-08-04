import { BehaviorSubject, Subject } from "rxjs";
import { CartItem } from "../common/CartItem";
 

export class CartService{

    cartItem: CartItem[] = [];

    totalPrice : Subject<number> = new BehaviorSubject<number>(0);
    totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

    


    
    

    addToCart(theCartItem : CartItem){
        console.log("see this ");

        let existingItemFlag : boolean = false;
        let existingCartItem = undefined;
  
        if(this.cartItem.length > 0){
        for(let item of this.cartItem){
            if (item.foodId === theCartItem.foodId){
                existingCartItem = item;
            
                break;
                // if so we assign it and then we break out of the loop

            }
        }
        existingItemFlag = existingCartItem != undefined;
     
     

    }


    if(existingItemFlag){
        existingCartItem!.quantity++;
    }else{
     
        this.cartItem.push(theCartItem);
    }
 
    console.log("this is called before compute totals");

    this.computeTotals();
    }

    computeTotals(){
        let totalPriceValue : number = 0;
        let totalQuantityValue : number = 0;

        console.log("currentItem length:" + this.cartItem.length);
       

        for(let currentCartItem of this.cartItem){
            totalPriceValue += currentCartItem.quantity * currentCartItem.price;
            totalQuantityValue += currentCartItem.quantity;

            console.log(`current item quantity is ${currentCartItem.price}`);
        }

        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);

        console.log(`the total price is ${totalPriceValue}`);
        console.log(`the total quantity is ${totalQuantityValue}`);
        // publish the new values all sucbribers will receive the new data and update real time 
        // next method push and send events 
    }
}