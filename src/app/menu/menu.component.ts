import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Menu, OpcionMenu } from "../menu.model";
import { Pagina } from "../pagina.model";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public contentCSS = `p{color:black;}`;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.nuevaOpcion.tipo = "pagina";
    this.nuevaOpcion.valor = "www.google.com";


    this.traerPaginas();
    this.traerMenus();
  }

  listaMenus: Menu[] = [];

  traerMenus() {
    this.http.get<Menu[]>("http://localhost:8888/menus").subscribe((res) => {
      this.listaMenus = res;
    })
  }




  openMymodal() {
    let myDialog: any = <any>document.getElementById("myModal");

    myDialog.showModal();
  }


  listaOpciones: OpcionMenu[] = [];

  nuevaOpcion: OpcionMenu = new OpcionMenu();

  tipoNuevaOpcion = ``;
  valorOpcionExterna: string;

  cambiarTipoOpcion(e) {

    console.log(e.target.value);

    this.nuevaOpcion.tipo = e.target.value;
    this.tipoNuevaOpcion = e.target.value;
  }


  menuForm = new FormGroup({
    nombreMenu: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ])
  });


  get nombreMenu() {
    return this.menuForm.get("nombreMenu");
  }

  get opciones() {
    return this.menuForm.get("opciones");
  }


  get enlaces() {
    return this.menuForm.get("enlaces");
  }


  paginaSeleccionada;


  nombreOpcion = "";
  agregarOpcion() {
    console.log("click");

    var paginaSeleccionada = this.paginaSeleccionada;


    if (this.tipoNuevaOpcion == "pagina") {

      var opcion = new OpcionMenu();

      opcion.tipo = "pagina";
      opcion.valor = paginaSeleccionada;
      opcion.nombre = this.nombreOpcion;

      console.log(opcion);

      if (paginaSeleccionada != "null" && paginaSeleccionada != null) {
        this.listaOpciones.push(opcion);
      }
    }
    else {
      var opcion = new OpcionMenu();

      opcion.tipo = "externa";
      opcion.valor = this.valorOpcionExterna;
      opcion.nombre = this.nombreOpcion;

      if (this.valorOpcionExterna != undefined) {

        this.listaOpciones.push(opcion);
      }

      console.log(opcion);

    }

    this.nombreOpcion = "";
  }

  eliminarOpcion(index: number) {

    this.listaOpciones.splice(index, 1)

  }

  validarContentCSS() {
    if (this.contentCSS.length < 1) {
      return false;
    } else {
      return true;
    }
  }

  validarListaOpciones() {
    if (this.listaOpciones.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  validarNombreOpcion() {
    if (this.nombreOpcion == "") {
      return false;
    }
    else {
      return true;
    }
  }





  listaPaginas: Pagina[];

  traerPaginas() {
    this.http.get<Pagina[]>("http://localhost:8888/paginas").subscribe((res) => {
      this.listaPaginas = res;
    })
  }

  @ViewChild('cerrarModalCrear') cerrarModalCrear: ElementRef;
  guardarMenu() {
    var nuevoMenu = new Menu();

    nuevoMenu.titulo = this.menuForm.value.nombreMenu;
    nuevoMenu.opciones = this.listaOpciones;
    nuevoMenu.css = this.contentCSS;

    var usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    nuevoMenu.usuario = usuarioActual.primernombre + " " + usuarioActual.primerapellido;

    console.log(nuevoMenu);

    this.http.post("http://localhost:8888/menus", nuevoMenu).subscribe((res) => {
      console.log(res);

      if (res) {
        //cerrar modal
        this.cerrarModalCrear.nativeElement.click();
        this.traerMenus();
      }


    })
  }

  eliminarTema(_id: string) {
    console.log(_id);

    this.http.delete("http://localhost:8888/menus/" + _id).subscribe((res) => {
      console.log(res);

      this.traerMenus();
    })
  }




  menuEditar: Menu = new Menu();

  listaOpcionesEditar: OpcionMenu[] = [];

  nuevaOpcionEditar: OpcionMenu = new OpcionMenu();

  paginaSeleccionadaEditar: string;

  valorOpcionExternaEditar;

  cambiarTipoOpcionEditar(e) {

    console.log(e.target.value);

    this.nuevaOpcionEditar.tipo = e.target.value;
  }

  agregarOpcionEditar() {
    console.log("click");

    var paginaSeleccionada = this.paginaSeleccionadaEditar;


    if (this.nuevaOpcionEditar.tipo == "pagina") {

      var opcion = new OpcionMenu();

      opcion.tipo = "pagina";
      opcion.valor = paginaSeleccionada;
      opcion.nombre = this.nombreOpcion;


      console.log(opcion);

      if (paginaSeleccionada != "null" && paginaSeleccionada != null) {
        this.listaOpcionesEditar.push(opcion);
      }
    }
    else {
      var opcion = new OpcionMenu();

      opcion.tipo = "externa";
      opcion.valor = this.valorOpcionExternaEditar;
      opcion.nombre = this.nombreOpcion;


      if (this.valorOpcionExternaEditar != undefined) {

        this.listaOpcionesEditar.push(opcion);
      }

      console.log(opcion);

    }

    this.nombreOpcion = "";
  }

  eliminarOpcionEditar(index: number) {

    this.listaOpcionesEditar.splice(index, 1)

  }

  getShortcut(menu: Menu) {
    var shortcut = `{"tipo":"menu","_id":"${menu._id}"}`;

    return shortcut;
  }


  menuFormEditar = new FormGroup({
    nombreMenuEditar: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ])
  });


  get nombreMenuEditar() {
    return this.menuFormEditar.get("nombreMenuEditar");
  }

  openModalEditar(menu: Menu) {
    this.menuEditar = menu;

    this.menuFormEditar.get("nombreMenuEditar").setValue(menu.titulo);
    this.contentCssEditar = menu.css;
    this.listaOpcionesEditar = menu.opciones;

  }


  contentCssEditar: string = "p{color:black;}";

  validarContentCSSEditar() {
    if (this.contentCssEditar.length < 1) {
      return false;
    } else {
      return true;
    }
  }


  validarListaOpcionesEditar() {
    if (this.listaOpcionesEditar.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  @ViewChild('cerrarModalEditar') cerrarModalEditar: ElementRef;

  guardarMenuEditar() {
    var nuevoMenu = new Menu();

    nuevoMenu.titulo = this.menuFormEditar.value.nombreMenuEditar;
    nuevoMenu.opciones = this.listaOpcionesEditar;
    nuevoMenu.css = this.contentCssEditar;

    console.log(nuevoMenu);



    this.http.put("http://localhost:8888/menus/" + this.menuEditar._id, nuevoMenu).subscribe((res) => {
      console.log(res);

      var resJson = JSON.parse(JSON.stringify(res));

      if (resJson.ok == 1) {

        this.traerMenus();

        this.cerrarModalEditar.nativeElement.click();
      }


    })
  }
}
