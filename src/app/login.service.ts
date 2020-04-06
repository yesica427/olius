import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Usuario } from "./usuario.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public listaDeUsuarios: Usuario[];
  public usuarioActual: Usuario;


  traerUsuarios() {

    if (JSON.parse(localStorage.getItem('listaUsuarios')) == null) {
      this.listaDeUsuarios = [];
    }
    else {
      this.listaDeUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
    }
  }

  registrarUsuario(

    primerNombre: string,
    segundoNombre: string,
    PrimerApellido: string,
    segundoApellido: string,
    contrasena: string,
    correo: string,
    identidad: string,
  ) {

    this.traerUsuarios()

    //revisar si no existe un usuario con el mismo correo 

    var usuario = this.listaDeUsuarios.filter(usuario => usuario.correo == correo.toLowerCase())[0];

    if (usuario != null) {
      //ya existe un usuario
      //console.log("Ya existe un usuario con el mismo correo");

      return { registroCorrecto: false, mensaje: "Ya existe un usuario con el mismo correo." };

    }
    else {

      var id = this.listaDeUsuarios.length + 1;

      var usuarioNuevo = new Usuario(id, primerNombre, segundoNombre, PrimerApellido, segundoApellido, contrasena, correo.toLocaleLowerCase(), identidad, false);

      //guardar el usuario en la lista de usuarios
      this.listaDeUsuarios.push(usuarioNuevo)

      //guardar la lista de usuarios en localStorage
      localStorage.setItem('listaUsuarios', JSON.stringify(this.listaDeUsuarios));

      return { registroCorrecto: true, mensaje: "Regstro Correcto" };
    }




  }

  login(correo: string, contrasena: string) {
    this.traerUsuarios();


    var usuario = this.listaDeUsuarios.filter(usuario => usuario.correo == correo.toLocaleLowerCase())[0];


    if (usuario == null) {
      //console.log("No existe el usuario con el correo dado.");

      return { loginCorrecto: false, mensaje: "No existe el usuario." };

    }
    else {

      if (usuario.contrasena != contrasena) {
        return { loginCorrecto: false, mensaje: "Contrasena Incorrecta" };
      }
      else {
        usuario.estLoggeado = true;

        this.usuarioActual = usuario;
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));

        return { loginCorrecto: true, mensaje: "login correcto" };
      }
    }
  }

  traerUsuarioActual() {
    this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    return this.usuarioActual;
  }

  logOut() {
    localStorage.setItem('usuarioActual', JSON.stringify(null));
  }
}
