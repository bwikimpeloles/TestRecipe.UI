import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Favourite } from 'src/app/models/favourite';
import { TestRecipe } from 'src/app/models/test-recipe';
import { TestRecipeService } from 'src/app/services/test-recipe.service';

@Component({
  selector: 'app-favourite-card',
  templateUrl: './favourite-card.component.html',
  styleUrls: ['./favourite-card.component.css']
})
export class FavouriteCardComponent {
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
