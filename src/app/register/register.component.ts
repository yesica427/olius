import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formularioRegistro = new FormGroup({
    primerNombre:new FormControl('Yesica'),
    segundoNombre:new FormControl('Maryori'),
    PrimerApellido:new FormControl('rodriguez'),
    segundoApellido:new FormControl('escalante'),
    contrasena1:new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,12}$/)]),
    contrasena2: new FormControl(''),
    identidad: new FormControl(''),
    correo: new FormControl('',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])


  });





  constructor() { }

  ngOnInit(): void {
  }
guardar(){
  
}



}
