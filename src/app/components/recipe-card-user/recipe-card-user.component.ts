import { FactoryTarget } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Account } from 'src/app/models/account';
import { Favourite } from 'src/app/models/favourite';
import { TestRecipe } from 'src/app/models/test-recipe';
import { TestRecipeService } from 'src/app/services/test-recipe.service';

@Component({
  selector: 'app-recipe-card-user',
  templateUrl: './recipe-card-user.component.html',
  styleUrls: ['./recipe-card-user.component.css']
})
export class RecipeCardUserComponent {
  title = 'TestRecipe.UI';
  recipes: TestRecipe[] = [];
  recipeToEdit?: TestRecipe;
  favourites: Favourite[] = [];
  favouriteToEdit?: Favourite;
  answer:number=0;

  @Input() recipe!: TestRecipe;
  @Input() favourite!: Favourite;
  @Input() account!: any;
  @Output() recipesUpdated = new EventEmitter<TestRecipe[]>();
  @Output() favouritesUpdated = new EventEmitter<Favourite[]>();

  constructor(public testRecipeService: TestRecipeService) {}

  ngOnInit():void {
    this.testRecipeService.getTestRecipes()
    .subscribe((result: TestRecipe[])  => (this.recipes = result));

  }  

  updateRecipeList(recipes: TestRecipe[]) {
    this.recipes = recipes;
  }

  addtoFavourite(recipes: TestRecipe[]) {
    this.recipes = recipes;
  }

  GetFavouritesCount(testRecipesId: any) {
    this.testRecipeService.GetFavouritesCount(testRecipesId)
    .subscribe((a)  => (this.answer = a));
    return this.answer;
  }

}
