import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-configuracion-pagina',
  templateUrl: './configuracion-pagina.component.html',
  styleUrls: ['./configuracion-pagina.component.css']
})
export class ConfiguracionPaginaComponent implements OnInit {

  

  constructor() { }
  public contentJS = `console.log("Hola, mundo")`;
  public contentCSS = `p{color:black;}`;

  ngOnInit(): void {
  }



  formularioConfiguracionPagina = new FormGroup({
    titulo: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),

    descripcion: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),

    palabrasclave: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
  });



  get titulo() {
    return this.formularioConfiguracionPagina.get("titulo");
  }



  get descripcion() {
    return this.formularioConfiguracionPagina.get("descripcion");
  }

  get palabrasclave() {
    return this.formularioConfiguracionPagina.get("palabrasclave");
  }








}
