import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { Favourite } from 'src/app/models/favourite';
import { TestRecipe } from 'src/app/models/test-recipe';
import { TestRecipeService } from 'src/app/services/test-recipe.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  title = 'TestRecipe.UI';
  recipes: TestRecipe[] = [];
  favourites: Favourite[] = [];
  recipeToEdit?: TestRecipe;
  searchText: string ="";
  public accounts: any=[];
  public username: string="";

  constructor(public testRecipeService: TestRecipeService, private router: Router) {}

  ngOnInit():void {
    this.testRecipeService.getTestRecipes()
    .subscribe((result: TestRecipe[])  => (this.recipes = result));
    this.testRecipeService.GetFavourite()
    .subscribe((result: Favourite[])  => (this.favourites = result));
  

    this.testRecipeService.getUsernameFromStore().subscribe(val =>{
      let usernameFromToken = this.testRecipeService.getUsernameFromToken();
      this.username = val || usernameFromToken
    })
    interval(60000).subscribe(() => {
      this.refresh();
  });
  }  

  updateRecipeList(recipes: TestRecipe[]) {
    this.recipes = recipes;
  }

  initNewRecipe() {
    this.recipeToEdit = new TestRecipe();
  }

  SignOut(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  okk() {
    console.log(this.testRecipeService.getToken());
  }

  refresh(){
    window.location.reload();
  }

  
}
