import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import {LandingPageComponent} from "./landing-page/landing-page.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path:'index', component:LandingPageComponent},
  {path:'',redirectTo:'/index', pathMatch: 'full',},

  {path:'login', component: LoginComponent,},
  {path:'register', component: RegisterComponent,},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
