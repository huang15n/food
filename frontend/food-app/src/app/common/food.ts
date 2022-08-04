import { Category } from "./category";

export class Food {
    id: number;

    foodName :string;
    foodDescription :string;
    image_url : string;
    price : number;
    stock : number;
    quantity: number;
    dateCreated :  Date;
    category: Category;
 
}
