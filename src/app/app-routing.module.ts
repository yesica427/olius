import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { NuevoArchivoComponent } from './nuevo-archivo/nuevo-archivo.component';
import { NuevoPostComponent } from './nuevo-post/nuevo-post.component';
import { PagesCreatedComponent } from './pages-created/pages-created.component';
import { CrearpaginaComponent } from './crearpagina/crearpagina.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { NuevotemaComponent } from  './nuevotema/nuevotema.component';
import { TemasComponent }  from './temas/temas.component';
import { VerpaginasComponent } from './verpaginas/verpaginas.component';
import { ConfiguracionPaginaComponent } from './configuracion-pagina/configuracion-pagina.component';
const routes: Routes = [
  {
    path: 'admin/categorias', component: CategoriaComponent
  },
  { path: 'index', component: LandingPageComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full', },
  { path: 'pageNotFound', component: PageNotFoundComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent, },
  {
    path: 'admin/posts', component: PostsComponent
  },
  {
    path: 'admin/users', component: UsersComponent
  },
  {
    path: 'admin/dashboard', component: DashboardComponent
  },

  {
    path: 'admin/archivos', component: ArchivosComponent
  },
  {
    path: 'admin/nuevoArchivo', component: NuevoArchivoComponent
  },

  {
    path: 'admin/nuevopost', component: NuevoPostComponent
  },
  { path: 'paginacreada', component: PagesCreatedComponent, },

  { path: 'admin/crearpagina', component: CrearpaginaComponent, },

 
  { path: 'admin/registro', component:  RegistroAdminComponent, },

  { path: 'admin/nuevotema', component:  NuevotemaComponent, },

  { path: 'admin/temas', component:  TemasComponent, },
  
  { path: 'admin/verpaginas', component:  VerpaginasComponent, },

  { path: 'admin/configuracion', component:  ConfiguracionPaginaComponent, },



  { path: 'admin', redirectTo: '/admin/dashboard', pathMatch: 'full', },
  
  { path: '**', redirectTo: '/pageNotFound', pathMatch: 'full', }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
