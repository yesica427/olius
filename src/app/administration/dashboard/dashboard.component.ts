import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { Usuario } from 'src/app/usuario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  public usuarioActual: Usuario;

  ngOnInit() {
    this.usuarioActual = this.loginService.traerUsuarioActual();
  }

}
