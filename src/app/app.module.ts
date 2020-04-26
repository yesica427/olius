import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
//editor froala
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { SidebarComponent } from './sidebar/sidebar.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderLoggedOutComponent } from './header-logged-out/header-logged-out.component';
import { BodyLandingPageComponent } from './body-landing-page/body-landing-page.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommentsComponent } from './comments/comments.component';
import { PagesCreatedComponent } from './pages-created/pages-created.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { NuevoArchivoComponent } from './nuevo-archivo/nuevo-archivo.component';
import { NuevoPostComponent } from './nuevo-post/nuevo-post.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { CrearpaginaComponent } from './crearpagina/crearpagina.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { NuevotemaComponent } from './nuevotema/nuevotema.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CategoriaComponent,
    LandingPageComponent,
    HeaderLoggedOutComponent,
    BodyLandingPageComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CommentsComponent,
    PagesCreatedComponent,
    CommentsComponent,
    DashboardComponent,
    ArchivosComponent,
    NuevoArchivoComponent,
    NuevoPostComponent,
    PostsComponent,
    UsersComponent,
    CrearpaginaComponent,
    PageNotFoundComponent,
    RegistroAdminComponent,
    NuevotemaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    CodemirrorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
