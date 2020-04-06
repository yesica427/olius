import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

    this.verificarSiEstaLogueado();
  }

  salir() {
    this.loginService.logOut();
    this.navigate()
  }

  navigate() {
    this.router.navigateByUrl('/index');
  }

  verificarSiEstaLogueado() {

    var usuarioActual = this.loginService.traerUsuarioActual();
    console.log(usuarioActual)
    if (usuarioActual == null) {
      //el usuario en local storage es nulls
      this.navigate();
    }
  }

}
