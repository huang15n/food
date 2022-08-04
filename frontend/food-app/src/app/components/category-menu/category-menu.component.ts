import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {

  categories : Category[] ;



  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.listFoodCategory();
  }

  listFoodCategory(){
    this.foodService.getCategories().subscribe( data => {
  this.categories = data;
  
  });

  }

}
