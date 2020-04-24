import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-crearpagina',
  templateUrl: './crearpagina.component.html',
  styleUrls: ['./crearpagina.component.css']
})
export class CrearpaginaComponent implements OnInit {

  constructor() { }

  public contentJS;
  public contentHTML;
  public contentCSS;

  ngOnInit(): void {
  }




formularioPagina = new FormGroup({
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
  return this.formularioPagina.get("titulo");
}



get descripcion(){
  return this.formularioPagina.get("descripcion");
}




/*categoria seleccionada*/

categoriaSeleccionada(){

var categoriaElegida=(<HTMLSelectElement>(
  document.getElementById("pagina-categoria")
)).value

};



tipopaginaSeleccionada(){
  var categoriaElegida=(<HTMLSelectElement>(
    document.getElementById("pagina-tipo")
  )).value

}





}
