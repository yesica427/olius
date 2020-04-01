import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioInicioSesion = new FormGroup({
    email:new FormControl('Yesica',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password:new FormControl('Rodriguez',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,12}$/)])
  });

  constructor() { }

  ngOnInit(): void {
  }

  get email(){
    return this.formularioInicioSesion.get('email')
  }

  get password(){
    return this.formularioInicioSesion.get('password')
  }


  

  entrar(){
  
    console.log(this.formularioInicioSesion.value);
    console.log('iniciovalido:' ,this.formularioInicioSesion.valid)
  }




}


