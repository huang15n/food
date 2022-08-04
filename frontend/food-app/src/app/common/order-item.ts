import { CartItem } from "./CartItem";

export class OrderItem {
    imageUrl: string;
 
    quantity: number;
    foodId: number
    price: number;
 

    constructor(cartItem : CartItem){
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.price = cartItem.price;
     
 
        this.foodId = cartItem.foodId;

    }
}
