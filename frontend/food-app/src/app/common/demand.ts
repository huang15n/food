 import { Address } from "./address";

export class Demand {
    id! : number;
    food_id! : number;
    dateCreated!: Date;
    lastUpdated! : Date;
    status!: string;
    totalPrice!: number;
    totalQuantity! : number;
    restaurantId !: number;
    email!: string;
    shippingAddress! : Address;
    billingAddress! : Address;





}
