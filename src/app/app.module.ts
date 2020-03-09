import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderLoggedOutComponent } from './header-logged-out/header-logged-out.component';
import { BodyLandingPageComponent } from './body-landing-page/body-landing-page.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { UserinputComponent } from './userinput/userinput.component';
import { NewentryComponent } from './newentry/newentry.component';
import { CommentsComponent } from './comments/comments.component';
import { EntrycategoryComponent } from './entrycategory/entrycategory.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import { PagesCreatedComponent } from './pages-created/pages-created.component';
 


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HeaderLoggedOutComponent,
    BodyLandingPageComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CreatePageComponent,
    UserinputComponent,
    NewentryComponent,
    CommentsComponent,
    EntrycategoryComponent,
    SidebarComponent,
    PagesCreatedComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
