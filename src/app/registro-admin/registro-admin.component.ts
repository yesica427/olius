import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }
  displayMensaje: string = 'none';
  mensajeRegistro: string = "Registro Exitoso.";

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

    var valorCategoria = (<HTMLSelectElement>document.getElementById('select-tipoUsuario')).value;


    var valores = this.formularioRegistro.value;


    var resultado = this.loginService.registrarUsuario(valores.primerNombre.toLowerCase(), valores.segundoNombre.toLowerCase(), valores.PrimerApellido.toLowerCase(), valores.segundoApellido.toLowerCase(), valores.contrasena1, valores.correo.toLowerCase(), valores.identidad, parseInt(valorCategoria));

    resultado.subscribe(async(res) => {
      console.log(res)

      var resJson = JSON.parse(JSON.stringify(res));
      if (resJson.registroCorrecto != false ) {
        this.mostrarMensaje(2500, "Registro Correcto.");



        await new Promise(resolve => setTimeout(resolve, 2500));
        this.navigate();
      }
      else {
        //alert(res.mensaje)
        this.mostrarMensaje(2500, resJson.mensaje);
        console.log(resJson.mensaje)
      }
    });
  }



  navigate() {
    this.router.navigateByUrl('/admin/users');
  }

 

  async mostrarMensaje(ms: number, mensaje: string) {

    this.mensajeRegistro = mensaje;

    this.displayMensaje = "block";

    await new Promise(resolve => setTimeout(resolve, ms));

    this.displayMensaje = "none";

  }

}


