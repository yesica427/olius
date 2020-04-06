import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrationComponent } from './administration.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { NuevoArchivoComponent } from './nuevo-archivo/nuevo-archivo.component';
import { CrearpaginaComponent } from './crearpagina/crearpagina.component';

const routes: Routes = [{
  path: '', component: AdministrationComponent,
  children: [
    {
      path: 'posts', component: PostsComponent
    },
    {
      path: 'users', component: UsersComponent
    },
    {
      path: 'dashboard', component: DashboardComponent
    },
    {
      path: 'categoria', component: CategoriasComponent
    },
    {
      path: 'archivos', component: ArchivosComponent
    },
    {
      path: 'nuevoArchivo', component: NuevoArchivoComponent
    },

    {
      path: 'nuevapagina', component: CrearpaginaComponent
    },
    //{ path: 'balance', loadChildren: () => import(`./balance/balance.module`).then(m => m.BalanceModule) },
    //{
    //  path: '', redirectTo: 'apply', pathMatch: 'full'
    //},

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
