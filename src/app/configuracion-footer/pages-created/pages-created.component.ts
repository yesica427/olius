import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ShortcutService } from "../shortcut.service";
import { Post } from "../post.model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pagina } from '../pagina.model';
import { Menu } from '../menu.model';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-pages-created',
  templateUrl: './pages-created.component.html',
  styleUrls: ['./pages-created.component.css'],
})
export class PagesCreatedComponent implements OnInit {

  constructor(private shortcut: ShortcutService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private renderer: Renderer2, @Inject(DOCUMENT) private _document, private sanitizer: DomSanitizer, private loginService: LoginService) { }


  public contenidoPagina = `
  <p>Mi primer pagina</p>
  `;

  //aqui se gurdara el contenido de la pagina principal
  contenidoPaginaPrincipal;


  listaPosts: Post[];

  //guarda los parametros de la url
  params: Params;

  public idPagina = 0;

  contenidoEncabezado: string = ``;
  contenidoFooter: string = ``;

  ngOnInit(): void {

    this.getParametrosURL();

    if (this.idPagina == null) {

      this.cargarPagina(1);
    }
    else {
      this.cargarPagina(this.idPagina);
    }

    this.traerLinksPaginas();

    this.insertarJS();

    //this.traerFooter()

    this.traerPaginaPrincipal();

    this.verificarUsuarioLogueado();


  }

  usuarioLogueado: any;
  verificarUsuarioLogueado() {
    this.usuarioLogueado = this.loginService.traerUsuarioActual();
  }

  //inserta el js del tema y pagina principal
  insertarJS() {
    // js de tema
    const s = this.renderer.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://localhost:8888/js/js_pagina.js';
    s.text = ``;
    this.renderer.appendChild(this._document.body, s);

    //js de pagina principal
    const inicioScript = this.renderer.createElement('script');
    inicioScript.type = 'text/javascript';
    inicioScript.src = 'http://localhost:8888/js/js_inicio.js';
    inicioScript.text = ``;
    this.renderer.appendChild(this._document.body, inicioScript);
  }

  //traer el html del footer
  traerFooter() {

    this.http.get("http://localhost:8888/configuracion/footer").subscribe((res) => {

      var resJson = JSON.parse(JSON.stringify(res));

      this.contenidoFooter = resJson.html;
    });
  }

  //traer el html del encabezado
  traerEncabezado() {

    this.http.get("http://localhost:8888/configuracion/encabezado").subscribe((res) => {

      var resJson = JSON.parse(JSON.stringify(res));

      this.contenidoEncabezado = resJson.html;
    });
  }

  //guarda los parametros url en this.params para obtener el idPagina
  getParametrosURL() {

    this.route.queryParams.subscribe((params: Params) => {

      this.params = params;

      const idpagina = params['idpagina'];

      this.idPagina = idpagina;

    });
  }

  //lista de anchors a paginas creadas
  public listaLinks: Pagina[];
  traerLinksPaginas() {
    this.http.get<Pagina[]>("http://localhost:8888/paginas/get/links").subscribe((res) => {

      this.listaLinks = res;

    });
  }

  //trae la lista de post de la categoria seleccionada en caso de ser pagina dinamica
  traerPost(categoria: string) {

    this.http.get<Post[]>("http://localhost:8888/posts/porcategoria/" + categoria).subscribe((res) => {

      this.listaPosts = res;

    })
  }


  //intercambia el texto del shortcut por el elemento correspondiente
  intercambiar(viejo: string, nuevo: string) {
    this.contenidoPagina = this.contenidoPagina.replace(viejo.trim(), nuevo);
  }


  //metodo que cambia el id de pagina
  cambiarIdPagina(idPagina: number) {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { "idpagina": idPagina } });

    this.cargarPagina(idPagina)
  }

  //variable que me permitira mostrar el texto de la pagina estatica con ngIf
  esPaginaEstatica: boolean = false;
  //muestra el encabezado en caso que la pagina lo requiere
  permiteEncabezado = false;
  //muestra el footer en caso que la pagina lo requiere
  permiteFooter = false;

  //trae el html de la pagina
  async cargarPagina(idpagina: number) {

    this.verificarUsuarioLogueado();

    //en esta variable se guardara el contenido de la pagina estatica
    this.contenidoPagina = "";

    this.permiteLogin = false;

    //trae la pagina
    var res = await this.http.get("http://localhost:8888/paginas/" + idpagina).toPromise()

    if (res == null) {
      //si la pagina no existe muestra mensaje 
      this.contenidoPagina = `<h1>La pagína a la que intentas acceder no existe.</h1><br><a href="/paginacreada?idpagina=1">Página principal</a>`;

      return;
    }


    //convierte la respuesta en json 
    var resJson = JSON.parse(JSON.stringify(res));

    // guarda las variables correspondientes de si permite encabezado y footer
    this.permiteEncabezado = resJson.encabezado;
    this.permiteFooter = resJson.footer;


    if (resJson.publica == false && this.usuarioLogueado == null) {
      // si la pagina no es publica y no hay usuario logueado, se muestra un mensaje de no acceso
      this.esPaginaEstatica = true;

      this.contenidoPagina = `<h1>No tienes acceso a esta página.</h1><br><a href="/paginacreada?idpagina=1">Página principal</a>`;
    }
    else {
      if (resJson.activa) {
        // si la pagina esta activa
        if (resJson.tipo == "dinamica") {
          // si la pagina es dinamica, se traen los post y se muestra el div donde se generaran los mismos
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
          // si la pagina es estatica

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
      else {
        //si la pagina esta marcada como inactica se muestra mensaje
        this.esPaginaEstatica = true;

        this.contenidoPagina = `<h1>Página actualmente inactiva.</h1><br><a href="/paginacreada?idpagina=1">Página principal</a>`;
      }
    }

  }

  async cargarElementos(paginaActual) {
    // revisa si la pagina tiene shortcuts y los intercambia por los elementos html correspondientes

    var shortcuts = this.shortcut.extraerJsons(this.contenidoPagina);

    for (let j = 0; j < shortcuts.length; j++) {

      var elemento = shortcuts[j];

      switch (elemento.json.tipo) {
        //hace switch sobre el tipo de shortcut

        case "imagen":

          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();


          if (res == null) {
            this.intercambiar(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {
            this.intercambiar(JSON.stringify(elemento.json), `<img src="${res.url}"  height="170" width="170">`);
          }

          break;

        case "video":

          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          if (res == null) {
            this.intercambiar(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {
            this.intercambiar(JSON.stringify(elemento.json), `<video width="320" height="240" controls>
                  <source src="${res.url}" type="video/mp4">
                  </video> `);
          }

          break;

        case "audio":

          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();


          if (res == null) {
            this.intercambiar(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {
            this.intercambiar(JSON.stringify(elemento.json), `<audio controls>
            <source src="${res.url}" type="audio/ogg">
          </audio>`);
          }

          break;

        case "documento":
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();


          if (res == null) {
            this.intercambiar(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {
            this.intercambiar(JSON.stringify(elemento.json), `<a href="${res.url}" target="_blank">${res.titulo}</a>`);
          }

          break;

        case "entrada":
          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res2: Post = await this.shortcut.traerPost(elemento.json._id).toPromise();


          if (res2 == null) {
            this.intercambiar(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {

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
          }

          break;

        case "enlace":
          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();


          if (res == null) {
            this.intercambiar(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {
            this.intercambiar(JSON.stringify(elemento.json), `<a href="${res.url}" target="_blank">${elemento.json.titulo}</a>`);

          }
          break;

        case "galeria":

          var html = await this.traerGaleria(elemento.json.imagenes);

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


          if (resMenu == null) {
            this.intercambiar(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {
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


            this.intercambiar(JSON.stringify(elemento.json), menuDivTemp);
          }


          break;

        case "login":
          //si encuentra shortcut de login, se muestra el componente de login al inicio de la pagina 
          this.permiteLogin = true;

          this.intercambiar(JSON.stringify(elemento.json), '<div></div>')
          break;
      }
    }
  }

  async traerGaleria(imagenesID: string[]) {
    //trae la lista de imagenes del shortcut de galeria y genera el elemento para retornarlo
    var imagenesHTML = `<div class="galeria">`;

    for (let i = 0; i < imagenesID.length; i++) {
      var res = await this.shortcut.traerArchivo(imagenesID[i]).toPromise();

      imagenesHTML += `<img src="${res.url}"  height="170" width="170" style="margin-left:0.5em">`;
    }

    imagenesHTML += `</div>`

    return imagenesHTML;
  }

  async analizarTextoPost(contenidoPost) {
    //analiza y extrae los shorcuts en el contenido del post insertado por shortcut

    var shortcuts = this.shortcut.extraerJsons(contenidoPost);

    for (let j = 0; j < shortcuts.length; j++) {


      var elemento = shortcuts[j];

      switch (elemento.json.tipo) {

        case "imagen":


          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();


          if (res == null) {

            contenidoPost = contenidoPost.replace(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {
            contenidoPost = contenidoPost.replace(JSON.stringify(elemento.json), `<img src="${res.url}"  height="170" width="170">`);
          }
          break;

        case "video":


          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();


          if (res == null) {
            contenidoPost = contenidoPost.replace(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);
          }
          else {
            contenidoPost = contenidoPost.replace(JSON.stringify(elemento.json), `<video width="320" height="240" controls>
          <source src="${res.url}" type="video/mp4">
          </video> `);
          }

          break;

        case "audio":
          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();


          if (res == null) {
            contenidoPost = contenidoPost.replace(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);
          }
          else {
            contenidoPost = contenidoPost.replace(JSON.stringify(elemento.json), `<audio controls>
          <source src="${res.url}" type="audio/ogg">
        </audio>`);
          }

          break;
        case "documento":
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();


          if (res == null) {
            contenidoPost = contenidoPost.replace(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);
          }
          else {
            contenidoPost = contenidoPost.replace(JSON.stringify(elemento.json), `<a href="${res.url}" target="_blank">${res.titulo}</a>`);
          }

          break;

        case "enlace":
          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();


          if (res == null) {
            contenidoPost = contenidoPost.replace(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {
            this.intercambiar(JSON.stringify(elemento.json), `<a href="${res.url}">${elemento.json.titulo}</a>`);
          }

          break;

        case "galeria":


          var html = await this.traerGaleria(elemento.json.imagenes);
          console.log(html)

          this.intercambiar(JSON.stringify(elemento.json), html);
          break;
      }

      return contenidoPost;
    }


  }

  //trae el html de la pagina principal
  traerPaginaPrincipal() {
    this.http.get("http://localhost:8888/paginas/1").subscribe((res) => {

      var resJson = JSON.parse(JSON.stringify(res));


      var divPaginaPrincipal = resJson.contenido;



      // this.contenidoPaginaPrincipal = this.sanitizer.bypassSecurityTrustHtml(divPaginaPrincipal);
      this.contenidoPaginaPrincipal = resJson.contenido;


      this.cargarElementosEnPaginaPrincipal(resJson);


    });
  }



  // login 
  permiteLogin: boolean = false;//variable para ngIf si encuentra un shortcut de login 

  //formulario reactivo para el login
  formularioInicioSesion = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,12}$/)])
  });


  get email() {
    return this.formularioInicioSesion.get('email');
  }

  get password() {
    return this.formularioInicioSesion.get('password');
  }


  entrar() {
    //hace login

    var valores = this.formularioInicioSesion.value;


    var respuesta = this.loginService.login(valores.email.toLowerCase(), valores.password);

    respuesta.subscribe((res) => {


      var resJson = JSON.parse(JSON.stringify(res));

      if (resJson[0].loginCorrecto) {

        localStorage.setItem('usuarioActual', JSON.stringify(res[1]));

        if (resJson[1].rol == 1) {
          // si es admin
          //this.navigate();
        }
        else if (resJson[1].rol == 2) {
          //this.router.navigateByUrl('/paginacreada');
        }
      }
      else {

        console.log(resJson[0].mensaje);

      }
    });


  }

  //intercambia el texto del shortcut por el elemento correspondiente en pagina principal
  intercambiarEnPaginaPrincipal(viejo: string, nuevo: string) {
    this.contenidoPaginaPrincipal = this.contenidoPaginaPrincipal.replace(viejo.trim(), nuevo);
  }

  async cargarElementosEnPaginaPrincipal(paginaActual) {
    // revisa si la pagina tiene shortcuts y los intercambia por los elementos html correspondientes en pagina principal


    var shortcuts = this.shortcut.extraerJsons(this.contenidoPaginaPrincipal);

    console.log("Arreglo de shortcuts: ", shortcuts);

    for (let j = 0; j < shortcuts.length; j++) {

      var elemento = shortcuts[j];

      switch (elemento.json.tipo) {
        //hace switch sobre el tipo de shortcut

        case "imagen":

          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          if (res == null) {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<img src="${res.url}"  height="170" width="170">`);
          }


          break;

        case "video":

          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          if (res == null) {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<video width="320" height="240" controls>
                  <source src="${res.url}" type="video/mp4">
                  </video> `);
          }

          break;

        case "audio":

          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          if (res == null) {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<audio controls>
            <source src="${res.url}" type="audio/ogg">
          </audio>`);
          }


          break;

        case "documento":
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          if (res == null) {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);
          } else {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<a href="${res.url}" target="_blank">${res.titulo}</a>`);
          }

          break;

        case "entrada":
          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res2: Post = await this.shortcut.traerPost(elemento.json._id).toPromise();

          if (res2 == null) {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {

            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `
          <div>
          <h3>${res2.titulopost}</h3>
          <div class="descripcion-post">
          ${await this.analizarTextoPost(res2.descripcion)}
          </div>
          <p>Creado por: <strong>${res2.usuario}</strong></p>
          <br>
          <hr>
        </div>`);

          }

          break;

        case "enlace":
          //convierto el observable en promesa y asi puedo usar await para esperar el resultado
          var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

          if (res == null) {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          }
          else {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<a href="${res.url}" target="_blank">${elemento.json.titulo}</a>`);
          }
          break;

        case "galeria":

          var html = await this.traerGaleria(elemento.json.imagenes);

          if (html == null) {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);

          } else {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), html);
          }


          break;

        case "breadcrumb":

          this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `
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

          if (resMenu == null) {
            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), `<h2>El archivo ya no existe.</h2>`);
          }
          else {
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


            this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), menuDivTemp);
          }

          break;

        case "login":
          //si encuentra shortcut de login, se muestra el componente de login al inicio de la pagina 
          this.permiteLogin = true;

          this.intercambiarEnPaginaPrincipal(JSON.stringify(elemento.json), '<div></div>')
          break;
      }
    }
  }
}
