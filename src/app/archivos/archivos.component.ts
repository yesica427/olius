import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {
  display='none';

  constructor() { }
  close(){
    this.display='none';
  }

  ngOnInit() {

    
  }


  openModal(){
    this.display="block";
  }

  


  archivosForm = new FormGroup({
    url: new FormControl("", [
      Validators.required,
     

    ]),


    titulo: new FormControl("", [Validators.required, Validators.minLength(5)]),
    categoria: new FormControl("", [Validators.required, Validators.minLength(5)]),
    descripcion: new FormControl("", [Validators.required, Validators.minLength(5)]),
    urlcaratula:new FormControl("", [Validators.required ]),
    tipo:new FormControl("", [Validators.required, Validators.minLength(5)]),
    shorcut:new FormControl("", [Validators.required, Validators.minLength(5)]),
  });


  get titulo() {
    return this.archivosForm.get("titulo");
  }



  get categoria() {
    return this.archivosForm.get("categoria");
  }


  get descripcion() {
    return this.archivosForm.get("descripcion");
  }



  get urlcaratula() {
    return this.archivosForm.get("urlcaratula");
  }
  


  get tipo() {
    return this.archivosForm.get("tipo");
  }
  

  get shorcut() {
    return this.archivosForm.get("shorcut");
  }

}
