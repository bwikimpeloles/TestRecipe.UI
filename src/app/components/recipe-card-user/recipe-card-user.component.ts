import { FactoryTarget } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() recipe!: TestRecipe;
  @Input() favourite!: Favourite;
  @Output() recipesUpdated = new EventEmitter<TestRecipe[]>();
  @Output() favouritesUpdated = new EventEmitter<Favourite[]>();

  constructor(public testRecipeService: TestRecipeService) {}

  ngOnInit():void {
    this.testRecipeService.getTestRecipes()
    .subscribe((result: TestRecipe[])  => (this.recipes = result));

    this.testRecipeService.GetFavourite()
    .subscribe((result: Favourite[])  => (this.favourites = result));
  }  

  updateRecipeList(recipes: TestRecipe[]) {
    this.recipes = recipes;
  }

}
