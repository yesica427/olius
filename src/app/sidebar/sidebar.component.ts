import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }


  private usuarioActual: Usuario;

  ngOnInit() {
    this.usuarioActual = this.loginService.traerUsuarioActual();

    if (this.usuarioActual == null) {
      this.navegarIndex();
    }
    else if (this.usuarioActual.rol != 1) {
      this.navegarIndex();
    }
   
  }

  salir() {
    this.loginService.logOut()
    this.navegarIndex()

  }

  navegarIndex() {
    this.router.navigateByUrl("/index");
  }
}
