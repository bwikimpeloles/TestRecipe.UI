import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TestRecipeService } from '../services/test-recipe.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private testRecipeService: TestRecipeService, private router: Router) {}
  canActivate(): boolean {
    if(this.testRecipeService.isLoggedIn()){
      return true;
    } else {
      this.router.navigate(['login'])
      return false;
    }
  }
  
}
