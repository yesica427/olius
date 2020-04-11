import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { Usuario } from 'src/app/usuario.model';
import { FormControl, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  public listaUsuarios: Usuario[];
  usuarioEditar: Usuario;
  mensajeModificado: boolean;


  ngOnInit() {
    this.traerUsuarios();

  }

  traerUsuarios() {
    this.loginService.traerUsuarios().subscribe((usuarios) => {

      this.listaUsuarios = usuarios;
      console.log(this.listaUsuarios)
    });
  }

  convertirPrimeraLetraMayuscula(palabra) {

    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  }

  eliminarUsuario(correo) {

    var usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    if (usuarioActual.correo == correo) {
      console.log("No puede borrar el usuario actual");
    }
    else {
      this.loginService.eliminarUsuario(correo).subscribe((res) => {

        this.traerUsuarios()
      })
    }
  }

  editarUsuario(usuario) {

    this.mensajeModificado = false;
    this.usuarioEditar = usuario;

    this.formularioActualizar.get('primerNombre').setValue(this.usuarioEditar.primernombre);
    this.formularioActualizar.get('segundoNombre').setValue(this.usuarioEditar.segundonombre);
    this.formularioActualizar.get('PrimerApellido').setValue(this.usuarioEditar.primerapellido);
    this.formularioActualizar.get('segundoApellido').setValue(this.usuarioEditar.segundoapellido);
    this.formularioActualizar.get('correo').setValue(this.usuarioEditar.correo);
    this.formularioActualizar.get('contrasena1').setValue(this.usuarioEditar.contrasena);
    this.formularioActualizar.get('identidad').setValue(this.usuarioEditar.identidad);
    this.formularioActualizar.get('contrasena2').setValue("");



    console.log(this.usuarioEditar);
  }
  //formulario para editar

  formularioActualizar = new FormGroup({
    primerNombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/), Validators.minLength(3)]),
    segundoNombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/), Validators.minLength(3)]),
    PrimerApellido: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/), Validators.minLength(3)]),
    segundoApellido: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/), Validators.minLength(3)]),
    contrasena1: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,12}$/)]),
    contrasena2: new FormControl('', [Validators.required]),
    identidad: new FormControl('', [Validators.required, Validators.minLength(13)]),
    correo: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
  });

  get primerNombre() {
    return this.formularioActualizar.get('primerNombre')
  }
  get segundoNombre() {
    return this.formularioActualizar.get('segundoNombre')
  }

  get PrimerApellido() {
    return this.formularioActualizar.get('PrimerApellido')
  }

  get segundoApellido() {
    return this.formularioActualizar.get('segundoApellido')
  }

  get contrasena1() {
    return this.formularioActualizar.get('contrasena1')
  }

  get contrasena2() {
    return this.formularioActualizar.get('contrasena2')
  }

  get identidad() {
    return this.formularioActualizar.get('identidad')
  }

  get correo() {
    return this.formularioActualizar.get('correo')
  }

  contrasenavalida() {
    if (this.formularioActualizar.get('contrasena1').value == this.formularioActualizar.get('contrasena2').value) {
      var bool = true;
      console.log(bool);

      return bool;
    }
    else {
      bool = false;
      return bool
    }
  }

  guardar() {
    //console.log(this.formularioActualizar.value);
    //console.log('iniciovalido:', this.formularioActualizar.valid)

    var valores = this.formularioActualizar.value;

    var tipoUsuario = (<HTMLSelectElement>document.getElementById('select-tipoUsuario')).value;

    console.log(tipoUsuario)

    var usuarioModificado = new Usuario(valores.primerNombre.toLowerCase(), valores.segundoNombre.toLowerCase(), valores.PrimerApellido.toLowerCase(), valores.segundoApellido.toLowerCase(), valores.contrasena1, valores.correo.toLowerCase(), valores.identidad, parseInt(tipoUsuario));

    var resultado = this.loginService.actualizarUsuario(this.usuarioEditar._id, usuarioModificado);

    resultado.subscribe((res) => {
      console.log(res);

      var resJson = JSON.parse(JSON.stringify(res))

      if (resJson.ok == 1) {
        this.mensajeModificado = true;

        this.traerUsuarios();
      }
    })

  }
}
