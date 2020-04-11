import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Usuario } from "./usuario.model";
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  urlBackend = 'http://localhost:8888';

  public listaDeUsuarios: Usuario[];
  public usuarioActual: Usuario;


  public traerUsuarios() {

    return this.http.get<Usuario[]>(this.urlBackend + "/usuarios");
  }

  registrarUsuario(
    primerNombre: string,
    segundoNombre: string,
    PrimerApellido: string,
    segundoApellido: string,
    contrasena: string,
    correo: string,
    identidad: string,
    rol: number
  ) {

    var usuario = new Usuario(
      primerNombre,
      segundoNombre,
      PrimerApellido,
      segundoApellido,
      contrasena,
      correo,
      identidad,
      rol);

    return this.http.post(this.urlBackend + "/usuarios", usuario);
  }

  login(correo: string, contrasena: string) {

    return this.http.post(this.urlBackend + "/usuarios/login", {
      correo: correo,
      contrasena: contrasena
    });
  }

  traerUsuarioActual() {
    this.usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    return this.usuarioActual;
  }

  eliminarUsuario(correo) {

    return this.http.delete(this.urlBackend + "/usuarios/" + correo)
  }

  actualizarUsuario(idUsuario, usuario) {
    return this.http.put(this.urlBackend + "/usuarios/" + idUsuario, usuario);
  }

  logOut() {
    localStorage.setItem('usuarioActual', JSON.stringify(null));
  }
}
