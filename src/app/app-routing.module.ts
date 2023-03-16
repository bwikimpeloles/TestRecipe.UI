import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccountlistComponent } from './components/accountlist/accountlist.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
  {
    path: 'adminhome',
    component: HomeComponent, canActivate:[AuthGuard],
  },
  {
    path: 'userhome',
    component: UserHomeComponent, canActivate:[AuthGuard],
  },
  {
    path: 'edit',
    component: EditRecipeComponent,
  },
  {
    path: 'login',
    component: SignUpComponent,
  },
  {
    path: 'accountlist',
    component: AccountlistComponent,
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
