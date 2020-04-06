import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { Usuario } from 'src/app/usuario.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  public listaUsuarios: Usuario[];
  ngOnInit() {
    this.loginService.traerUsuarios();

    this.listaUsuarios = this.loginService.listaDeUsuarios;

    console.log(this.listaUsuarios)
  }

}
