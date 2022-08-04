import { Employee } from "./employee";
import { Restaurant } from "./restaurant";

export class Owner {
    id:number;
    username: string;
    password: string;
    phone: string;
    email: string;
    firstName: string;
    lastName: string;
   
    employees: Employee[];
    restaurant: Restaurant;
}
