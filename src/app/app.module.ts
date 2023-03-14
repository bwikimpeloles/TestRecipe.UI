import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RequestPasswordComponent } from './components/request-password/request-password.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { RecipeCardUserComponent } from './components/recipe-card-user/recipe-card-user.component';
import { FavouritebuttonComponent } from './components/favouritebutton/favouritebutton.component';
import { CommonModule } from '@angular/common';
import { AccountlistComponent } from './components/accountlist/accountlist.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    AppComponent,
    EditRecipeComponent,
    RecipeCardComponent,
    HeaderComponent,
    HomeComponent,
    SignUpComponent,
    ResetPasswordComponent,
    RequestPasswordComponent,
    UserHomeComponent,
    RecipeCardUserComponent,
    FavouritebuttonComponent,
    AccountlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    Ng2SearchPipeModule

  ],
  providers: [RecipeCardComponent, {
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi:true
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
