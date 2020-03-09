import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import {LandingPageComponent} from "./landing-page/landing-page.component";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { UserinputComponent } from './userinput/userinput.component';
import { NewentryComponent } from './newentry/newentry.component';
import { EntrycategoryComponent } from './entrycategory/entrycategory.component';
import { PagesCreatedComponent } from './pages-created/pages-created.component';


const routes: Routes = [
  {path:'index', component:LandingPageComponent},
  {path:'',redirectTo:'/index', pathMatch: 'full',},

  {path:'login', component: LoginComponent,},
  {path:'register', component: RegisterComponent,},
  {path:'home', component: HomeComponent,},
  {path:'crearpagina', component: CreatePageComponent,},
  {path:'entradausuario', component: UserinputComponent ,},
  {path:'nuevaentrada', component: NewentryComponent ,},
  {path:'categoriaentrada', component: EntrycategoryComponent ,},
  { path: 'admin', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  {path:'paginacreada', component:PagesCreatedComponent ,},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
