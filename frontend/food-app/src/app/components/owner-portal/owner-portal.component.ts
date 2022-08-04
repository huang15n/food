import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/common/employee';
import { Food } from 'src/app/common/food';
import { Owner } from 'src/app/common/owner';
import { EmployeeService } from 'src/app/services/employee.service';
import { OwnerService } from 'src/app/services/owner.service';

import { Chart } from 'chart.js';



@Component({
  selector: 'app-owner-portal',
  templateUrl: './owner-portal.component.html',
  styleUrls: ['./owner-portal.component.css']
})
export class OwnerPortalComponent implements OnInit {

  owner!: Owner;

  employee : Employee = new Employee();


  food : Food = new Food();


  food_list! : Food[];

  category_id! : number;

  pieChart: any;
  
   

  constructor(private route: ActivatedRoute, private router: Router, private ownerService : OwnerService) { }

  

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(data => {
      console.log(data["username"]);
      this.ownerService.verifyUserName(data["username"]).subscribe(data => {
        console.log(data);
        this.owner = data;
        this.ownerService.foodList(this.owner.restaurant.id).subscribe(data => {
          this.food_list = data;
          console.log(this.food_list);
        })
      })
    })

  

    
  }

  


  


  fireEmployee(id:number){

    this.ownerService.fireEmployee(id).subscribe({
      next:data =>{
        console.log("deleted");
        this.router.navigate(['owner-portal'],{
          queryParams : {username: this.owner.username}
        });
        window.location.reload();


      },
      error:error =>{
        console.log(error);

      }

    })

  }


  hireEmployee(){

    this.ownerService.hireEmployee(this.owner.restaurant.id,this.owner.id,this.employee).subscribe({
      next: data =>{

        console.log("hired");

        window.location.reload();

      }
    }
      
    );  
  }

  deleteFood(id : number){

    
    this.ownerService.deleteFood(id).subscribe({
      next:data =>{
        console.log("deleted");
        this.router.navigate(['owner-portal'],{
          queryParams : {username: this.owner.username}
        });
        window.location.reload();


      },
      error:error =>{
        console.log(error);

      }

    })

  }

  createMenu(){
    this.ownerService.createMenu(this.category_id, this.owner.restaurant.id,this.food).subscribe({
      next: data =>{
        console.log("created new menu");
        window.location.reload();
      }
    })
  }




}
