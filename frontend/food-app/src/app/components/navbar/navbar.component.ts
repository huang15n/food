import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { Restaurant } from 'src/app/common/restaurant';
import { RestaurantServiceService } from 'src/app/services/restaurant-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewChecked {

  restaurantList : Restaurant[];

  logout: boolean = false;
 

  constructor(private router: Router, private restaurantService: RestaurantServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(
      response => {
        this.restaurantList = response;
      }
    );
  }

  ngAfterViewChecked(): void{
    this.route.queryParams.subscribe(
      data => {
        if(data["username"] != null){
          this.logout = true;
        }else{
          this.logout = false;
        }
      }
    );

  }

  search(value: string){
    this.router.navigateByUrl(`/search/${value}`);
  }

}
