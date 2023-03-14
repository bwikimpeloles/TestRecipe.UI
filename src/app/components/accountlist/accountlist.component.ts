import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TestRecipeService } from 'src/app/services/test-recipe.service';

@Component({
  selector: 'app-accountlist',
  templateUrl: './accountlist.component.html',
  styleUrls: ['./accountlist.component.css']
})
export class AccountlistComponent {
 
  public accounts: any=[];

  constructor(public testRecipeService: TestRecipeService, private router: Router) {}

  ngOnInit():void {

    this.testRecipeService.getAccounts()
    .subscribe((result: any[])  => (this.accounts = result));
  }  

  SignOut(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
