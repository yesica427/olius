import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  formularioRegistro = new FormGroup({
    primerNombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/), Validators.minLength(3)]),
    segundoNombre: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/), Validators.minLength(3)]),
    PrimerApellido: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/), Validators.minLength(5)]),
    segundoApellido: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/), Validators.minLength(5)]),
    contrasena1: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,12}$/)]),
    contrasena2: new FormControl('', [Validators.required]),
    identidad: new FormControl('', [Validators.required, Validators.minLength(13)]),
    correo: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),



  });





  ngOnInit(): void {
  }


  get primerNombre() {
    return this.formularioRegistro.get('primerNombre')
  }

  get segundoNombre() {
    return this.formularioRegistro.get('segundoNombre')
  }



  get PrimerApellido() {
    return this.formularioRegistro.get('PrimerApellido')
  }

  get segundoApellido() {
    return this.formularioRegistro.get('segundoApellido')
  }


  get contrasena1() {
    return this.formularioRegistro.get('contrasena1')
  }



  get contrasena2() {
    return this.formularioRegistro.get('contrasena2')
  }

  get identidad() {
    return this.formularioRegistro.get('identidad')
  }


  get correo() {
    return this.formularioRegistro.get('correo')
  }



  contrasenavalida() {


    if (this.formularioRegistro.get('contrasena1').value == this.formularioRegistro.get('contrasena2').value) {
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
    console.log(this.formularioRegistro.value);
    console.log('iniciovalido:', this.formularioRegistro.valid)

    var valores = this.formularioRegistro.value;

    console.log(valores.primerNombre)


    var resultado = this.loginService.registrarUsuario(valores.primerNombre, valores.segundoNombre, valores.PrimerApellido, valores.segundoApellido, valores.contrasena1, valores.correo, valores.identidad);

    console.log(resultado)
    if (resultado.registroCorrecto != false) {
      this.navigate();
    }
    else {
      //alert(resultado.mensaje)

      console.log(resultado.mensaje)
    }
  }



  navigate() {
    this.router.navigateByUrl('/login');
  }

}

