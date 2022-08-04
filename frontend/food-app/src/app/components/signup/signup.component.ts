import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Customer } from 'src/app/common/customer';
import { SignupService } from 'src/app/services/signup.service';
 
 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpFormGroup! : FormGroup;
 

  constructor(private formBuilder: FormBuilder, private signupService: SignupService) { }

  ngOnInit(): void {
    this.signUpFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        'firstName': new FormControl('',[Validators.required, Validators.minLength(2)]),
        'lastName': new FormControl('',[Validators.required,Validators.minLength(2)]),
        'email': new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        'phone': new FormControl('',[Validators.required, Validators.pattern('^[0-9]{9}')]),
         'username': new FormControl('', [Validators.required, Validators.minLength(5)]),
        'password': new FormControl('',[Validators.required,Validators.minLength(6)]),
   
      }),
    });

  }

  onSubmit(){
    console.log("this is me");
    console.log(`${this.username?.value}`);
    let customer = new Customer();
    customer.accountCreated = new Date();
    customer.balance = 0.0;
     customer.email = this.email?.value;
     customer.username = this.username?.value;
     customer.password = this.password?.value;
     customer.firstName = this.firstName?.value;
     customer.lastName = this.lastName?.value;
     customer.moneySpent = 0.0;
     customer.signature = "";
     customer.phone = this.phone?.value;
  


    this.signupService.addCustomer(customer).subscribe({
      next: response =>  {
        alert("thank you for joining us!");

      },
      error: err => {
        console.log("there is an error:"+err);
      }
    });
    
  }


  
  get firstName(){
    return this.signUpFormGroup.get('customer.firstName');
  }

  get lastName(){
    return this.signUpFormGroup.get('customer.lastName');
  }

  get email(){
    return this.signUpFormGroup.get('customer.email');
  }

  get dateOfBirth(){
    return this.signUpFormGroup.get('customer.dateOfBirth');
  }

  get phone(){
    return this.signUpFormGroup.get('customer.phone');
  }

  get username(){
    return this.signUpFormGroup.get('customer.username');
  }

  get password(){
    return this.signUpFormGroup.get('customer.password');
  }

  
 


 


}


 
 
 