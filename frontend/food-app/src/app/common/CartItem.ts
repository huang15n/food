
import { Food } from "./food";
export class CartItem{
    
    name : string;

    imageUrl: string;

 
    foodId: number;
 
    price: number;
    quantity: number;

    constructor(food: Food){
        this.foodId = food.id;
        this.name = food.foodName;
        this.imageUrl = food.image_url;
  
        this.price = food.price;
        this.quantity = food.quantity;

    }
}