import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TestRecipe } from 'src/app/models/test-recipe';
import { TestRecipeService } from 'src/app/services/test-recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  title = 'TestRecipe.UI';
  recipes: TestRecipe[] = [];
  recipeToEdit?: TestRecipe;

  @Input() recipe: any;
  @Output() recipesUpdated = new EventEmitter<TestRecipe[]>();

  constructor(public testRecipeService: TestRecipeService) {}

  ngOnInit():void {
    this.testRecipeService.getTestRecipes()
    .subscribe((result: TestRecipe[])  => (this.recipes = result));
  }  

  updateRecipeList(recipes: TestRecipe[]) {
    this.recipes = recipes;
  }

  editRecipe(recipe: TestRecipe) {
    this.recipeToEdit = recipe;
  }

  deleteRecipe(recipe : TestRecipe) {
    this.testRecipeService
    .deleteRecipe(recipe)
    .subscribe((recipes: TestRecipe[]) => this.recipesUpdated.emit(recipes));

    window.location.reload();
  }

  cancelEditRecipe(recipe: TestRecipe) {
    this.recipeToEdit = undefined;
  }
}
