import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TestRecipe } from 'src/app/models/test-recipe';
import { TestRecipeService } from 'src/app/services/test-recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'TestRecipe.UI';
  recipes: TestRecipe[] = [];
  recipeToEdit?: TestRecipe;
  searchText: string ="";
  public accounts: any=[];
  public username: string="";

  constructor(public testRecipeService: TestRecipeService, private router: Router) {}

  ngOnInit():void {
    this.testRecipeService.getTestRecipes()
    .subscribe((result: TestRecipe[])  => (this.recipes = result));

    this.testRecipeService.getAccounts()
    .subscribe((result: any[])  => (this.accounts = result));

    this.testRecipeService.getUsernameFromStore().subscribe(val =>{
      let usernameFromToken = this.testRecipeService.getUsernameFromToken();
      this.username = val || usernameFromToken
    })
    
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
    window.location.reload();
  }

  refresh(){
    window.location.reload();
  }

  
}
