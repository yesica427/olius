import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-nuevotema',
  templateUrl: './nuevotema.component.html',
  styleUrls: ['./nuevotema.component.css']
})
export class NuevotemaComponent implements OnInit {

  constructor() { }
  public contentJS;
  public contentHTML;
  public contentCSS;

  ngOnInit(): void {
  }



  formularioTema = new FormGroup({
    titulo: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),
  
    descripcion: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  
  
  
  get titulo(){
    return this.formularioTema.get("titulo");
  }
  
  
  
  get descripcion(){
    return this.formularioTema.get("descripcion");
  }
  



}
