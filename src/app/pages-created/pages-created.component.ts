import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser'

import { ShortcutService } from "../shortcut.service";
import { Post } from "../post.model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pagina } from '../pagina.model';
import { Menu } from '../menu.model';


@Component({
  selector: 'app-pages-created',
  templateUrl: './pages-created.component.html',
  styleUrls: ['./pages-created.component.css'],
})
export class PagesCreatedComponent implements OnInit {

  constructor(private shortcut: ShortcutService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private renderer: Renderer2, @Inject(DOCUMENT) private _document, private sanitizer: DomSanitizer) { }

  listaPosts: Post[];

  //guarda los parametros de la url
  params: Params;

  public idPagina = 0;

  contenidoEncabezado: string = ``;
  contenidoFooter: string = ``;

  ngOnInit(): void {

    this.getParametrosURL();

    if (this.idPagina == null) {
      console.log("IdPagina nulo")
      this.cargarPagina(1);
    }
    else {
      this.cargarPagina(this.idPagina);
    }

    this.traerLinksPaginas();

    this.insertarJS();

    //this.traerFooter()
  }

  insertarJS() {
    const s = this.renderer.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://localhost:8888/js/js_pagina.js';
    s.text = ``;
    this.renderer.appendChild(this._document.body, s);
  }

  traerFooter() {
    console.log("llama a traer footer");


    this.http.get("http://localhost:8888/configuracion/footer").subscribe((res) => {

      //console.log(res)

      var resJson = JSON.parse(JSON.stringify(res));

      this.contenidoFooter = resJson.html;
    });
  }

  traerEncabezado() {
    console.log("llama a traer encabezado");


    this.http.get("http://localhost:8888/configuracion/encabezado").subscribe((res) => {

      //console.log(res)

      var resJson = JSON.parse(JSON.stringify(res));

      this.contenidoEncabezado = resJson.html;
    });
  }

  //guarda los parametros url en this.params
  getParametrosURL() {

    this.route.queryParams.subscribe((params: Params) => {

      this.params = params;

      const idpagina = params['idpagina'];

      console.log('idpagina', idpagina);

      this.idPagina = idpagina;

      if (idpagina == null) {
        //this.cargarPagina(1);

      }
      else {
        //this.cargarPagina(idpagina);
      }

    });
  }

  public listaLinks: Pagina[];
  traerLinksPaginas() {
    this.http.get<Pagina[]>("http://localhost:8888/paginas/get/links").subscribe((res) => {

      this.listaLinks = res;

    });
  }

  traerPost(categoria: string) {

    this.http.get<Post[]>("http://localhost:8888/posts/porcategoria/" + categoria).subscribe((res) => {

      this.listaPosts = res;

    })
  }

  contenidoPaginaSegura;

  intercambiar(viejo: string, nuevo: string) {
    this.contenidoPagina = this.contenidoPagina.replace(viejo.trim(), nuevo);
    //this.contenidoPaginaSegura = this.sanitizer.bypassSecurityTrustHtml(this.contenidoPagina);
    //this.contenidoPaginaSegura = this.sanitizer.bypassSecurityTrustScript(this.contenidoPagina);
  }


  cambiarIdPagina(idPagina: number) {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { "idpagina": idPagina } });

    this.cargarPagina(idPagina)
  }

  esPaginaEstatica: boolean = false;
  async cargarPagina(idpagina: number) {
    this.contenidoPagina = "";

    var res = await this.http.get("http://localhost:8888/paginas/" + idpagina).toPromise()


    var resJson = JSON.parse(JSON.stringify(res));

    //console.log(resJson);

    if (resJson.tipo == "dinamica") {
      this.esPaginaEstatica = false;

      this.contenidoPagina += `<h3>${resJson.descripcion}</h3>`

      //traer los post con la categoria de la pagina
      this.traerPost(resJson.categoria);

      if (resJson.footer) {
        this.traerFooter();
      }

      if (resJson.encabezado) {
        this.traerEncabezado();
      }

    } else if (resJson.tipo == "estatica") {

      this.esPaginaEstatica = true;

      this.contenidoPagina = resJson.contenido;

      this.cargarElementos(resJson);

      if (resJson.footer) {
        this.traerFooter();
      }

      if (resJson.encabezado) {
        this.traerEncabezado();
      }
    }


  }

  async cargarElementos(paginaActual) {


    var shortcuts = this.shortcut.extraerJsons(this.contenidoPagina);
    console.log(shortcuts)

    for (let j = 0; j < shortcuts.length; j++) {


      var elemento = shortcuts[j];

      switch (elemento.json.tipo) {

        case "imagen":

          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          this.intercambiar(JSON.stringify(elemento.json), `<img src="${res.url}"  height="170" width="170">`);

          break;

        case "video":

          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          this.intercambiar(JSON.stringify(elemento.json), `<video width="320" height="240" controls>
                  <source src="${res.url}" type="video/mp4">
                  </video> `);
          break;

        case "audio":

          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          this.intercambiar(JSON.stringify(elemento.json), `<audio controls>
            <source src="${res.url}" type="audio/ogg">
          </audio>`);
          break;

        case "entrada":
          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res2: Post = await this.shortcut.traerPost(elemento.json._id).toPromise();


          this.intercambiar(JSON.stringify(elemento.json), `
          <div>
          <h3>${res2.titulopost}</h3>
          <div class="descripcion-post">
          ${await this.analizarTextoPost(res2.descripcion)}
          </div>
          <p>Creado por: <strong>${res2.usuario}</strong></p>
          <br>
          <hr>
        </div>`);

          break;

        case "enlace":
          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          this.intercambiar(JSON.stringify(elemento.json), `<a href="${res.url}">${elemento.json.titulo}</a>`);
          break;

        case "galeria":
          console.log("galeria")

          var html = await this.traerGaleria(elemento.json.imagenes);
          console.log(html)

          this.intercambiar(JSON.stringify(elemento.json), html);
          break;

        case "breadcrumb":

          this.intercambiar(JSON.stringify(elemento.json), `
          <div class="breadcrumb">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/paginacreada?idpagina=1">Pagina Principal</a></li>
                <li class="breadcrumb-item active" aria-current="page">${paginaActual.titulomenu}</li>
              </ol>
            </nav> 
          </div>
          `);
          break;
        case "menu":

          var resMenu = await this.http.get<Menu>("http://localhost:8888/menus/" + elemento.json._id).toPromise();

          console.log(resMenu)
          console.log("Menu")

          var menuDivTemp = `<div class="Menu">`;

          for (let i = 0; i < resMenu.opciones.length; i++) {
            var opcion = resMenu.opciones[i];

            if (opcion.tipo == "externa") {
              menuDivTemp += `<a href="${opcion.valor}" style="margin-right: 0.5em;" target="_blank">${opcion.nombre}</a>`
            }
            else if (opcion.tipo == "pagina") {
              menuDivTemp += `<a href="/paginacreada?idpagina=${opcion.valor}" style="margin-right: 0.5em;">${opcion.nombre}</a>`
            }
          }
          menuDivTemp += `</div>`;

          console.log(menuDivTemp);


          console.log(elemento.json)
          this.intercambiar(JSON.stringify(elemento.json), menuDivTemp);
          break;

        case "login":

          var htmlLogin = `
        <div>
        <input type="mail" placeholder="Ingresa tu correo">
        <input type="password" placeholder="Ingresa tu contraseña">
        <button type="button">Login</button>
        </div>
        `;

          this.intercambiar(JSON.stringify(elemento.json), htmlLogin);


          break;
      }
    }
  }

  async traerGaleria(imagenesID: string[]) {
    var imagenesHTML = `<div class="galeria">`;

    for (let i = 0; i < imagenesID.length; i++) {
      var res = await this.shortcut.traerArchivo(imagenesID[i]).toPromise();

      imagenesHTML += `<img src="${res.url}"  height="170" width="170" style="margin-left:0.5em">`;
    }

    imagenesHTML += `</div>`

    return imagenesHTML;
  }

  async analizarTextoPost(contenidoPost) {

    var shortcuts = this.shortcut.extraerJsons(contenidoPost);

    for (let j = 0; j < shortcuts.length; j++) {


      var elemento = shortcuts[j];

      switch (elemento.json.tipo) {

        case "imagen":


          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          contenidoPost = contenidoPost.replace(JSON.stringify(elemento.json), `<img src="${res.url}"  height="170" width="170">`)

          break;

        case "video":


          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();
          contenidoPost = contenidoPost.replace(JSON.stringify(elemento.json), `<video width="320" height="240" controls>
          <source src="${res.url}" type="video/mp4">
          </video> `)

          break;

        case "audio":
          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          contenidoPost = contenidoPost.replace(JSON.stringify(elemento.json), `<audio controls>
          <source src="${res.url}" type="audio/ogg">
        </audio>`)

          break;
        case "enlace":
          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          this.intercambiar(JSON.stringify(elemento.json), `<a href="${res.url}">${elemento.json.titulo}</a>`);
          break;

        case "galeria":
          console.log("galeria")

          var html = await this.traerGaleria(elemento.json.imagenes);
          console.log(html)

          this.intercambiar(JSON.stringify(elemento.json), html);
          break;
      }

      return contenidoPost;
    }


  }


  public contenidoPagina = `
  <p>Mi primer pagina</p>
  `;

}
