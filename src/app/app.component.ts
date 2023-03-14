import { Component } from '@angular/core';
import { TestRecipe } from './models/test-recipe';
import { TestRecipeService } from './services/test-recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestRecipe.UI';
  constructor(public testRecipeService: TestRecipeService) {}
}