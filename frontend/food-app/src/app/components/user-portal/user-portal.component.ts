import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { Demand } from 'src/app/common/demand';
import { LoginService } from 'src/app/services/login.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css']
})
export class UserPortalComponent implements OnInit {

  username!: string | null;
  user!: Customer;
  order : Demand[] = [];
  status = "";
  constructor(private route: ActivatedRoute,private router: Router, private loginService: LoginService, private orderService: OrderService) {
    
   }

  ngOnInit(): void {
    

 this.getOrder();

   

  }


  getOrder(){
    
    this.route.queryParams.subscribe(
      data => {
       
        this.loginService.verifyUserName(data["username"]).subscribe(
          data => {this.user = data;

            this.orderService.getOrders(this.user.email).subscribe(
              data => {this.order = data;
                
              
                for (let item of this.order){
                  console.log(item['dateCreated']);
                }
              }
        
            );
          


           
          
          
          }
        );

        
      }
    )

  }


  deleteOrder(id:number){
    this.orderService.deleteOrder(id).subscribe(
      {
        next: data => {
          this.status = "deleted;"
          this.getOrder();
          this.router.navigate(['user-portal'],{
            queryParams : {username: this.user.username}
          });

        },
        error: error => {
          console.log("there is an error!", error);
        }
      }
    );

  }

  
}
