import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { NuevoArchivoComponent } from './nuevo-archivo/nuevo-archivo.component';
import { CrearpaginaComponent } from './crearpagina/crearpagina.component';


@NgModule({
  declarations: [AdministrationComponent, SidebarComponent, HeaderComponent, UsersComponent, PostsComponent, DashboardComponent, CategoriasComponent, ArchivosComponent, NuevoArchivoComponent, CrearpaginaComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }