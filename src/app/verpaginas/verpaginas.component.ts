import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Pagina } from '../pagina.model';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Categorias } from "../categorias.model";
import { MensajesService } from '../mensajes.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-verpaginas',
  templateUrl: './verpaginas.component.html',
  styleUrls: ['./verpaginas.component.css']
})
export class VerpaginasComponent implements OnInit {
  display = 'none';



  constructor(private http: HttpClient, public mensajeService: MensajesService) { }

  public listaCategorias: Categorias[];


  paginaEstatica = true;

  //froala editor
  public contenidoEditor: string = "Escriba una descripción para su página";
  //opciones para el editor froala
  public options: Object = {
    placeholderText: "Escriba algo aquí.",
    charCounterCount: false,
  };





  close() {
    this.display = 'none';
  }


  public listapaginas: Pagina[];

  ngOnInit(): void {
    this.traerpaginas();


    //traer categorias 
    this.http.get<Categorias[]>("http://localhost:8888/categorias/").subscribe((res) => {
      this.listaCategorias = res;
      console.log(res)
    });




  }


  paginaEditar: Pagina;

  encabezado: boolean = false;
  footer: boolean = false;
  activa: boolean = false;
  publica: boolean = false;

  openModal(pagina: Pagina) {

    this.paginaEditar = pagina;

    this.formularioPagina.get('titulo').setValue(pagina.titulo);
    this.formularioPagina.get('descripcion').setValue(pagina.descripcion);
    this.formularioPagina.get('titulomenu').setValue(pagina.titulomenu);
    this.contenidoEditor = pagina.contenido;

    var palabrasclave = pagina.palabrasclave.join();
    this.formularioPagina.get('palabrasclave').setValue(palabrasclave);

    this.encabezado = pagina.encabezado;
    this.footer = pagina.footer;
    this.activa = pagina.activa;
    this.publica = pagina.publica;


    this.display = "block";


  }

  traerpaginas() {

    this.http.get<Pagina[]>('http://localhost:8888/paginas').subscribe(
      (res) => {
        console.log(res)
        this.listapaginas = res;
        this.copiaListaPaginas = res;

      }
    )

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

    palabrasclave: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),

    titulomenu: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),

  });



  get titulo() {
    return this.formularioPagina.get("titulo");
  }



  get descripcion() {
    return this.formularioPagina.get("descripcion");
  }

  get palabrasclave() {
    return this.formularioPagina.get("palabrasclave");
  }

  get titulomenu() {
    return this.formularioPagina.get("titulomenu");
  }




  cambiarTipoPagina() {
    //hace que el editor aparezca si la pagina es estatica

    var tipoPagina = (<HTMLSelectElement>(
      document.getElementById("pagina-tipo")
    )).value

    if (tipoPagina == "estatica") {
      this.paginaEstatica = true;
    }
    else if (tipoPagina == "dinamica") {
      this.paginaEstatica = false;
    }

  }
  /*categoria seleccionada*/

  categoriaSeleccionada() {

    var categoriaElegida = (<HTMLSelectElement>(
      document.getElementById("pagina-categoria")
    )).value

    return categoriaElegida;
  };



  tipopaginaSeleccionada() {
    var tipoPagina = (<HTMLSelectElement>(
      document.getElementById("pagina-tipo")
    )).value

    return tipoPagina;
  }


  validarContenidoEditor() {
    return this.contenidoEditor.length > 1;
  }


  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  guardarPagina() {


    //crear el objeto pagina
    var nuevaPagina = new Pagina()


    var valoresForm = this.formularioPagina.value;

    nuevaPagina.titulo = valoresForm.titulo;
    nuevaPagina.descripcion = valoresForm.descripcion;
    nuevaPagina.titulomenu = valoresForm.titulomenu;
    nuevaPagina.palabrasclave = valoresForm.palabrasclave.split(",");

    nuevaPagina.categoria = this.categoriaSeleccionada();
    nuevaPagina.tipo = this.tipopaginaSeleccionada();

    //verificar si quiere encabezado
    var encabezado = <HTMLInputElement>document.getElementById("encabezado");
    nuevaPagina.encabezado = encabezado.checked;

    //verificar si quiere footer
    var footer = <HTMLInputElement>document.getElementById("footer");
    nuevaPagina.footer = footer.checked;

    //verificar si  esta activa o inactiva
    var activa = <HTMLInputElement>document.getElementById("activa");
    nuevaPagina.activa = activa.checked;
    var publica = <HTMLInputElement>document.getElementById("publica");
    nuevaPagina.publica = publica.checked;


    //contenido del editor wysiwyg
    nuevaPagina.contenido = this.contenidoEditor;


    console.log(nuevaPagina);

    // //guardarlo en la base 
    this.http.put("http://localhost:8888/paginas/" + this.paginaEditar._id, nuevaPagina).subscribe(async (res) => {

      var resJson = JSON.parse(JSON.stringify(res));

      console.log(resJson);

      if (resJson.ok == 1) {

        this.traerpaginas();

        this.mensajeService.mostrarMensaje(1500, "Editado exitosamente.");

        await new Promise(resolve => setTimeout(resolve, 1500));

        //cerrar modal
        this.botonCerrar.nativeElement.click();

      } else {
        this.mensajeService.mostrarMensaje(2500, "Ocurrió un error.");
      }

    })


  }


  /*eliminar*/

  eliminarPagina(_id: string) {


    this.http.delete('http://localhost:8888/paginas/' + _id).subscribe(
      (res) => {
        console.log(res)

        this.traerpaginas();
      }
    );
  }







  copiaListaPaginas: Pagina[];
  tipoSeleccionado: string;

  filtroTipo() {

    console.log(this.categoriaSeleccionada)

    this.listapaginas = this.copiaListaPaginas;

    if (this.tipoSeleccionado != "null") {
      this.listapaginas = this.listapaginas.filter((pagina) => {
        return pagina.tipo.toLowerCase() == this.tipoSeleccionado;
      });
    }
  }


  busquedaInput: string;

  busquedanombre() {

    this.listapaginas = this.copiaListaPaginas;


    if (this.busquedaInput != "") {

      this.listapaginas = this.listapaginas.filter((pagina) => {
        return pagina.titulo.toLocaleLowerCase().includes(this.busquedaInput.toLocaleLowerCase()) ||
          pagina.descripcion.toLocaleLowerCase().includes(this.busquedaInput.toLocaleLowerCase());
      });
    }
  }









}
