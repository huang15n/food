import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyWord: string;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  search(value:string){
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
    // this calls the path:'search/:keyword', component = "foodListComponent"
  // it route the dat to our search route will be handled by the component 

  
  }

}
