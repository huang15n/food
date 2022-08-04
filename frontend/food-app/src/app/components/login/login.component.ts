import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoginService } from 'src/app/services/login.service';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup! : FormGroup;
  showWarning : boolean = false;
 
  restaurantOption?: string = "employee";
  
  options = ["employee","owner"];


  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private employeeLogin: EmployeeService, private ownerLogin: OwnerService, private router: Router, private route : ActivatedRoute) {

   }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("",[Validators.required]),
      }),
      owner: this.formBuilder.group({
        ownerUsername: new FormControl("", [Validators.required]),
        ownerPassword: new FormControl("",[Validators.required]),
      })},
      

      

    );
  }

  getOption(event: Event){
    this.restaurantOption = (event.target as HTMLInputElement).value;
    console.log(this.restaurantOption);
  }

  RestaurantLogin(){
    let employee = this.employeeLogin.verifyUserName(this.ownerUsername?.value);
    let owner = this.ownerLogin.verifyUserName(this.ownerUsername?.value);
 if(this.restaurantOption === "employee"){
   employee.subscribe(data => {
     if(data === null){
       console.log("cannot find user name");
       this.showWarning = true;
     }else{
       console.log(data['username'] );
      if(data['username'] === this.ownerUsername?.value && data["password"] === this.ownerPassword?.value ){
        console.log("you logged in");
        this.router.navigate(['employee-portal'], {
          queryParams: {  username: this.ownerUsername!.value }
       });
        //this.router.navigate(['/billingpdf',{billing:JSON.stringify(this.bill)}])

        
      }else{
        console.log("you credential is incorrect");
        this.showWarning = true;
      }

     }
   });
 }

 if(this.restaurantOption === "owner"){
 
   owner.subscribe(data => {
     if(data === null){
       console.log("cannot find user name");
       this.showWarning = true;
     }else{
       console.log(data['username'] );
      if(data['username'] === this.ownerUsername?.value && data["password"] === this.ownerPassword?.value ){
        console.log("you logged in");
        this.router.navigate(['owner-portal'], {
          queryParams: {  username: this.ownerUsername!.value }
       });
        //this.router.navigate(['/billingpdf',{billing:JSON.stringify(this.bill)}])

        
      }else{
        console.log("you credential is incorrect");
        this.showWarning = true;
      }

     }
   });
 
 }


  }


  onSubmit(){
 

   let  customer = this.loginService.verifyUserName(this.username?.value);
    customer.subscribe(
      data => {
        if(data === null){
          console.log("cannot find user name");
           this.showWarning = true;
        }else{
          if(data['username'] === this.username?.value && data["password"] === this.password?.value ){
            console.log("you logged in");
            this.router.navigate(['user-portal'], {
              queryParams: {  username: this.username!.value }
           });
            //this.router.navigate(['/billingpdf',{billing:JSON.stringify(this.bill)}])

            
          }else{
            console.log("you credential is incorrect");
            this.showWarning = true;
          }
        }
      }
    );

  }


  get username(){
    return this.loginFormGroup.get("customer.username");

  }

  get password(){
    return this.loginFormGroup.get("customer.password");

  }

  get ownerUsername(){
    return this.loginFormGroup.get("owner.ownerUsername");
  }

  get ownerPassword(){
    return this.loginFormGroup.get("owner.ownerPassword");
  }


 

}
