import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Demand } from 'src/app/common/demand';
import { Employee } from 'src/app/common/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { OrderService } from 'src/app/services/order.service';


import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/CartService';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CountryStateServiceService } from 'src/app/services/country-state-service.service';
import { DateServiceService } from 'src/app/services/date-service.service';
import { OrderValidator } from 'src/app/validator/order-validator';

@Component({
  selector: 'app-employee-portal',
  templateUrl: './employee-portal.component.html',
  styleUrls: ['./employee-portal.component.css']
})
export class EmployeePortalComponent implements OnInit {

  employee! : Employee;
  orders! :Demand[];
  status = "";
  checkoutFormGroup!: FormGroup;

  totalPrice : number = 0;
  totalQuantity : number = 0;

  creditCardMonths : number[] = [];
  creditCardYears : number[] = [];

  country: Country[] = [];

  state: State[] =[];


  shippingAddressStates: State[] = [];
  billingAddressStates : State[] = [];







  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService, private orderService: OrderService,private formBuilder: FormBuilder, private dateService: DateServiceService, private countryStateService: CountryStateServiceService, private cartService: CartService, private checkoutService: CheckoutService ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      console.log(data["username"]);
      this.employeeService.verifyUserName(data["username"]).subscribe(data => {
        console.log(data);
        this.employee = data;
        console.log(`the restaurant id is ${this.employee.restId}`);
        this.getOrder();
       
      })
    })

    this.reviewCartDetails();

    this.countryStateService.getCountries().subscribe(
      data => {
        this.country = data;
      }
    );

   

 




    this.checkoutFormGroup = this.formBuilder.group({
      food: this.formBuilder.group({
        'food_id': new FormControl('',[Validators.required, OrderValidator.notOnlyWhiteSpace]),
        'quantity': new FormControl('',[Validators.required, OrderValidator.notOnlyWhiteSpace]),
        'price': new FormControl('',[Validators.required, OrderValidator.notOnlyWhiteSpace]),
      }),
 
        customer: this.formBuilder.group({
          'firstName': new FormControl('',[Validators.required, Validators.minLength(2), OrderValidator.notOnlyWhiteSpace]),
          'lastName': new FormControl('',[Validators.required,Validators.minLength(2), OrderValidator.notOnlyWhiteSpace]),
          'email': new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
        }),
        shippingAddress: this.formBuilder.group({
          'street':  new FormControl('',[Validators.required,Validators.minLength(2), OrderValidator.notOnlyWhiteSpace]),
          'city' :  new FormControl('',[Validators.required,Validators.minLength(2), OrderValidator.notOnlyWhiteSpace]),
          state : [''],
          country:[''],
          'zipCode':  new FormControl('',[Validators.required,Validators.minLength(2), OrderValidator.notOnlyWhiteSpace])
        }),
        billingAddress: this.formBuilder.group({
          'street':  new FormControl('',[Validators.required,Validators.minLength(2), OrderValidator.notOnlyWhiteSpace]),
          'city' :  new FormControl('',[Validators.required,Validators.minLength(2), OrderValidator.notOnlyWhiteSpace]),
          state : [''],
          country:[''],
          'zipCode':  new FormControl('',[Validators.required,Validators.minLength(2), OrderValidator.notOnlyWhiteSpace])
        }),
        creditCard: this.formBuilder.group({
          cardType: new FormControl('',[Validators.required]),
          nameOnCard: new FormControl('',[Validators.required, Validators.minLength(2)]),
          cardNumber: new FormControl('',[Validators.required, Validators.pattern('[0-9]{16}')] ),
          securityCode: new FormControl('',[Validators.required, Validators.pattern('[0-9]{3}')] ),
          expirationMonth: [''],
          expirationYear: ['']

        })

    })


   

    const startMonth: number = new Date().getMonth() + 1;
    this.dateService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );


    this.dateService.getCreditCardYears().subscribe(
      data => {
      
        this.creditCardYears = data;
        console.log("the years are " + this.creditCardYears);
      }
    );

  }


  
  reviewCartDetails(){
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

      
  }


  getOrder(){
    this.orderService.getRestaurant(this.employee.restId).subscribe(data => {
      this.orders = data;
    })
  }

  deleteOrder(id:number){
    this.orderService.deleteOrder(id).subscribe(
      {
        next: data => {
          this.status = "deleted;"
          this.getOrder();
          this.router.navigate(['employee-portal'],{
            queryParams : {username: this.employee.username}
          });

        },
        error: error => {
          console.log("there is an error!", error);
        }
      }
    );

  }

  onSubmit(id:number){
    console.log(`id is ${id}`);

    console.log(this.status);
    this.orderService.upateOrder(id,this.status).subscribe({
      next: data =>{
        this.getOrder();
      },
      error: error => {
        console.log("there is an error:",error);
      }
    });



  }

  onOrderSubmit(){
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order 
    let order = new Order();

  
    console.log(`food id is ${this.food_id?.value}` );
    
    order.totalPrice = this.price?.value;
    order.totalQuantity = this.quantity?.value;

    // get cart items
    const cartItems = this.cartService.cartItem;

    // create orderItems from cartItems
    // - long way
    
    let orderItems: OrderItem[] = [];
    for (let i=0; i < cartItems.length; i++) {
      orderItems[i] = new OrderItem(cartItems[i]);
    }
    

    // - short way of doing the same thingy
   // let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // set up purchase
    let purchase = new Purchase();
    
    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
 
    
    // populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;
  
    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.food_id = this.food_id?.value;
    purchase.order.food_id = this.food_id?.value;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
        next: response => {
          alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

          // reset cart
          this.resetCart();

        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    );







  }

  resetCart(){
    // reset cart data 
    this.cartService.cartItem = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.checkoutFormGroup.reset();
 

  }

  copyShippingtoBilling(event: any){
  

    
    if(event.target!.checked){
     this.checkoutFormGroup.controls["billingAddress"].setValue(this.checkoutFormGroup.controls["shippingAddress"].value) ;
    }else{
      this.checkoutFormGroup.controls["billingAddress"].reset();
    }

  }


  handleMonthAndYears(){
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedyear : number = Number(creditCardFormGroup?.value.expirationYear);
    let startMonth: number;

    if(currentYear === selectedyear){
      startMonth = new Date().getMonth() + 1;
    }else{
      startMonth = 1;

    }

    this.dateService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )
  }

  getStates(formGroupName: string){

    console.log("invoked here"+formGroupName);
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;



    this.countryStateService.getStates(countryCode).subscribe(
    data => {
      if(formGroupName === "shippingAddress"){
        this.shippingAddressStates = data;
        console.log("shipping is called:" + this.shippingAddressStates);

      }else{
        this.billingAddressStates = data;
        console.log("billing is called" + this.billingAddressStates);
    


      }


   
    }
    );

  }

  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email(){
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet(){
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity(){
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

   
  
  get shippingAddressZipCode(){
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get  billingAddressStreet(){
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get  billingAddressCity(){
    return this.checkoutFormGroup.get('billingAddress.city');
  }

   
  
  get  billingAddressZipCode(){
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }



  get creditCardType(){
    return this.checkoutFormGroup.get('creditCard.cardType');

  }


  
  get creditCardNameOnCard(){
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
    
  }

  get creditCardNumber(){
    return this.checkoutFormGroup.get('creditCard.cardNumber');
    
  }


  get creditCardSecurityCode(){
    return this.checkoutFormGroup.get('creditCard.securityCode');
    
  }

  get food_id(){
    return this.checkoutFormGroup.get('food.food_id');
    
  }

  get quantity(){
    return this.checkoutFormGroup.get('food.quantity');
  }
  

  get price(){
    return this.checkoutFormGroup.get('food.price');
  }




}



