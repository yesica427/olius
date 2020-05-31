import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Tema } from "../tema.model";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MensajesService } from '../mensajes.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {


  public listaTemas: Tema[];

  display = 'none';

  public contentJS = `console.log("Hola, mundo")`;
  public contentCSS = `p{color:black;}`;

  images = [];
  multipleImages = [];

  cuentaIncorrecta: boolean = false;

  constructor(private http: HttpClient, private _sanitizer: DomSanitizer, public mensajeService: MensajesService) { }

  ngOnInit(): void {

    this.traerTemas()
  }


  formularioTema = new FormGroup({
    titulo: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),

    descripcion: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ])
  });


  get titulo() {
    return this.formularioTema.get("titulo");
  }



  get descripcion() {
    return this.formularioTema.get("descripcion");
  }

  validarContenidoCSS() {

    if (this.contentCSS.length > 1) {
      return true;
    }
    else {
      return false;
    }
  }

  validarContenidoJS() {

    if (this.contentJS.length > 1) {
      return true;
    }
    else {
      return false;
    }
  }




  traerTemas() {
    this.http.get<Tema[]>("http://localhost:8888/temas/").subscribe((res) => {
      this.listaTemas = res;
      this.copiaListaTema = res;

      console.log(this.listaTemas);
    });
  }

  getBackground(image) {
    //console.log(image)
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }


  establecerTema(id: string) {


    console.log(id);

    var objeto = {
      id: id
    }

    this.http.put("http://localhost:8888/temas//establecer/tema", objeto).subscribe((res) => {
      console.log(res);
    })
  }


  eliminarTema(id: string) {


    console.log(id)

    this.http.delete("http://localhost:8888/temas/" + id).subscribe((res) => {

      console.log(res);

      this.traerTemas();
    });
  }

  close() {
    this.display = 'none';
  }


  temaEditar: Tema;

  openModal(tema: Tema) {

    this.temaEditar = tema;

    this.formularioTema.get('titulo').setValue(tema.titulo);
    this.formularioTema.get('descripcion').setValue(tema.descripcion);
    this.contentCSS = tema.css;
    this.contentJS = tema.js;


    this.display = "block";
  }


  @ViewChild('botonCerrar') botonCerrar: ElementRef;
  guardarTema() {

    var nuevoTema = new Tema();

    nuevoTema.titulo = this.formularioTema.get('titulo').value;
    nuevoTema.descripcion = this.formularioTema.get("descripcion").value;
    nuevoTema.css = this.contentCSS;
    nuevoTema.js = this.contentJS;

    console.log(nuevoTema);

    this.http.put("http://localhost:8888/temas/" + this.temaEditar._id, nuevoTema).subscribe(async (res) => {

      //console.log(res);

      var resJSON = JSON.parse(JSON.stringify(res));

      if (resJSON.ok == 1) {
        console.log("correcto");


        this.mensajeService.mostrarMensaje(1500, "Editado exitosamente.");

        await new Promise(resolve => setTimeout(resolve, 1500));

        //cerrar modal
        this.botonCerrar.nativeElement.click();

        this.traerTemas();

        this.formularioTema.get('titulo').value;
        this.formularioTema.get("descripcion").value;
        this.contentCSS;
        this.contentJS;
      }


    });


  }

  inputBusqueda: string;
  copiaListaTema: Tema[];
  busqueda() {
    this.listaTemas = this.copiaListaTema;


    if (this.inputBusqueda != "") {

      this.listaTemas = this.listaTemas.filter((tema) => {
        return tema.titulo.toLocaleLowerCase().includes(this.inputBusqueda.toLocaleLowerCase()) ||
          tema.descripcion.toLocaleLowerCase().includes(this.inputBusqueda.toLocaleLowerCase());
      });
    }

  }

}
