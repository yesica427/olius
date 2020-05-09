import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


import { Pagina } from "../pagina.model"
import { Categorias } from "../categorias.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearpagina',
  templateUrl: './crearpagina.component.html',
  styleUrls: ['./crearpagina.component.css']
})
export class CrearpaginaComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  public listaCategorias: Categorias[];

  public contentJS;
  public contentHTML;
  public contentCSS;

  paginaEstatica = true;

  //froala editor
  public contenidoEditor: string = "Escriba una descripción para su página";

  //opciones para el editor froala
  public options: Object = {
    placeholderText: "Escriba algo aquí.",
    charCounterCount: false,
  };


  ngOnInit(): void {

    //traer categorias 
    this.http.get<Categorias[]>("http://localhost:8888/categorias/").subscribe((res) => {
      this.listaCategorias = res;
      console.log(res)
    });

    this.traerCuentaDePaginas();
  }




  cantidadPaginasEnBase: number;

  traerCuentaDePaginas() {
    this.http.get("http://localhost:8888/paginas/cuenta/documentos").subscribe((res) => {

      var resJson = JSON.parse(JSON.stringify(res));

      this.cantidadPaginasEnBase = resJson.res;

      console.log(this.cantidadPaginasEnBase);
    })
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


  guardarPagina() {


    //crear el objeto pagina
    var nuevaPagina = new Pagina()


    var valoresForm = this.formularioPagina.value;

    nuevaPagina.titulo = valoresForm.titulo;
    nuevaPagina.descripcion = valoresForm.descripcion;

    nuevaPagina.categoria = this.categoriaSeleccionada();
    nuevaPagina.tipo = this.tipopaginaSeleccionada();

    //verificar si quiere encabezado
    var encabezado = <HTMLInputElement>document.getElementById("encabezado");
    nuevaPagina.encabezado = encabezado.checked;

    //verificar si quiere encabezado
    var footer = <HTMLInputElement>document.getElementById("footer");
    nuevaPagina.footer = footer.checked;

    //verificar si  esta actica o inactiva
    var activa = <HTMLInputElement>document.getElementById("activa");
    nuevaPagina.activa = activa.checked;

    nuevaPagina.titulomenu = valoresForm.titulomenu;

    nuevaPagina.palabrasclave = valoresForm.palabrasclave.split(",");

    //contenido del editor wysiwyg
    nuevaPagina.contenido = this.contenidoEditor;

    //url
    nuevaPagina.url = this.cantidadPaginasEnBase + 1;

    var usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    var usuario = usuarioActual.primernombre + " " + usuarioActual.primerapellido;

    nuevaPagina.usuario = usuario;

    console.log(nuevaPagina);

    //guardarlo en la base 
    this.http.post("http://localhost:8888/paginas/", nuevaPagina).subscribe((res) => {

      var resJson = JSON.parse(JSON.stringify(res));

      console.log(resJson);

      //   //cuando se guarda, redireccionar a todos los posts
      this.router.navigateByUrl('/admin/verpaginas');

    })


  }



}
