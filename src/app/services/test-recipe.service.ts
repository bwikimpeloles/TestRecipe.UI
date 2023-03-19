import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { Favourite } from '../models/favourite';
import { TestRecipe } from '../models/test-recipe';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class TestRecipeService {
  private url = "TestRecipe";
  showDialog = false;
  hideDialog = true;
  showCreate = false;
  showCreateButton = true;
  favouritemenu= false;
  usermenu=true;
  private apiUrl = environment.apiUrl;
  helper: JwtHelperService;
  private username$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  
  private userPayload:any;
  

  constructor(private http: HttpClient, private router: Router) { 
    this.helper = new JwtHelperService();
    this.userPayload = this.decodedToken();
  }

  public getTestRecipes() : Observable<TestRecipe[]> {
    return this.http.get<TestRecipe[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateRecipe(recipe: TestRecipe) : Observable<TestRecipe[]> {
    return this.http.put<TestRecipe[]>(`${environment.apiUrl}/${this.url}`, 
    recipe);
  }

  public createRecipe(recipe: TestRecipe) : Observable<TestRecipe[]> {
    return this.http.post<TestRecipe[]>(`${environment.apiUrl}/${this.url}`, 
    recipe);
  }

  public deleteRecipe(recipe: TestRecipe) : Observable<TestRecipe[]> {
    return this.http.delete<TestRecipe[]>(`${environment.apiUrl}/${this.url}/${recipe.id}`);
  }

  //favourite

  public addFavourite(accountsId: number, testRecipeId: number) {
    return this.http.post<any>(`${environment.apiUrl}/${this.url}/favourite`,{accountsId: accountsId,
      testRecipeId: testRecipeId,});
  }

  public deleteFavourite(accountsId: number, testRecipeId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/${this.url}/favourite/${accountsId}/${testRecipeId}`);
  }

  public GetFavourites(accountsId: number) {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/favourite/${accountsId}`);
  }

  public GetFavouritesCount(testRecipesId: number) {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/favouritecount/${testRecipesId}`,);
  }




    //account
  
    public SignUp(accountObj: any) {
      return this.http.post<any>(`${environment.apiUrl}/${this.url}/register`, 
      accountObj);
    }

    public Login(accountObj: any) {
      return this.http.post<any>(`${environment.apiUrl}/${this.url}/authenticate`, 
      accountObj);
    }

    SignOut() {
      
      localStorage.clear();
      this.router.navigateByUrl('/login');
      
    }

    public storeToken(tokenValue: string) {
      localStorage.setItem('token', tokenValue)
    }

    public getToken() {
      return localStorage.getItem('token');
    }

    public isLoggedIn(): boolean {
      return !!localStorage.getItem('token');
    }

    getAccounts() {
      return this.http.get<any>(`${environment.apiUrl}/${this.url}/allusers`);
    }

    public getRoleFromStore(){
      return this.role$.asObservable();
    }

    public setRoleForStore(role: string) {
      this.role$.next(role);
    }

    public getUsernameFromStore(){
      return this.username$.asObservable();
    }

    public setUsernameForStore(username: string) {
      this.username$.next(username);
    }

    decodedToken() {
      const jwtHelper = new JwtHelperService();
      const token = this.getToken()!;
      console.log(jwtHelper.decodeToken(token)) + " this is decoded token";
      return jwtHelper.decodeToken(token);
    }

    getUsernameFromToken(){
      if(this.userPayload)
      return this.userPayload.unique_name;
    }

    getRoleFromToken(){
      if(this.userPayload)
      console.log(this.userPayload.role + " this is get rolefromtoken")
      return this.userPayload.role;
    }

    getSidFromToken(){
      if(this.userPayload)
      console.log(this.userPayload.id + " this is get rolefromtoken")
      return this.userPayload.id;
    }



}
