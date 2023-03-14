import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Favourite } from 'src/app/models/favourite';
import { TestRecipe } from 'src/app/models/test-recipe';
import { TestRecipeService } from 'src/app/services/test-recipe.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent {
  @Input() recipe? : TestRecipe; 
  @Input() favourite? : Favourite; 
  @Output() recipesUpdated = new EventEmitter<TestRecipe[]>();
  @Output() favouritesUpdated = new EventEmitter<Favourite[]>();

  
  

  constructor(public testRecipeService: TestRecipeService, private recipeCardComponent: RecipeCardComponent) {}

  ngOnInit() : void{}

  updateRecipe(recipe : TestRecipe) {
   this.testRecipeService
   .updateRecipe(recipe)
   .subscribe((recipes: TestRecipe[]) => this.recipesUpdated.emit(recipes));


   window.location.reload();
  }

  deleteRecipe(recipe : TestRecipe) {
    this.testRecipeService
    .deleteRecipe(recipe)
    .subscribe((recipes: TestRecipe[]) => this.recipesUpdated.emit(recipes));

    window.location.reload();
  }

  createRecipe(recipe : TestRecipe) {
    this.testRecipeService
      .createRecipe(recipe)
      .subscribe((recipes: TestRecipe[]) => this.recipesUpdated.emit(recipes));

    
    return recipe;
  }

  createFavourite(recipe : TestRecipe) {
    this.favourite= {
      productId: recipe.id!,
      username: recipe.instruction!.toString(),
      favouriteBool: false
    }
    this.testRecipeService.CreateFavourite(this.favourite).subscribe((favourites: Favourite[]) => this.favouritesUpdated.emit(favourites))
    window.location.reload();
  }

  cancelEditRecipe(recipe: TestRecipe) {
    this.recipeCardComponent.recipeToEdit = undefined;
  }

  closeCreateRecipe(recipe: TestRecipe) {
    this.recipe = undefined;
  }

  exit() {
    window.location.reload();
  }

}
