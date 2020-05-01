import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { ShortcutService } from "../shortcut.service";
import { Post } from "../post.model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pagina } from '../pagina.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-pages-created',
  templateUrl: './pages-created.component.html',
  styleUrls: ['./pages-created.component.css'],
})
export class PagesCreatedComponent implements OnInit {

  constructor(private shortcut: ShortcutService, private http: HttpClient, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private elRef: ElementRef, private renderer: Renderer2) { }

  listaPosts: Post[];

  //sobre esta variable se introducira el html de la pagina

  contenidoDivPost: string = `<h1>Lista de Posts:</h1>`;

  //guarda los parametros de la url
  params: Params;

  public idPagina = 0;

  postAPasar: Post;

  ngOnInit(): void {

    console.log("LLamado ngInit");
    this.getParametrosURL();

    this.cargarPagina(1);

    this.traerLinksPaginas();


  }


  //guarda los parametros url en this.params
  getParametrosURL() {

    this.route.queryParams.subscribe((params: Params) => {

      this.params = params;

      //console.log('App params', params);

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

  barraLinks: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(`<p>Aqui iran los lins</p>`);

  public listaLinks: Pagina[];

  traerLinksPaginas() {
    this.http.get<Pagina[]>("http://localhost:8888/paginas/get/links").subscribe((res) => {

      this.listaLinks = res;

      // var stringTemp = "";
      // // let html = this.sanitizer.bypassSecurityTrustHtml("<svg> blah </svg>");
      // this.barraLinks = "";

      // stringTemp += `<div id="barra-links-hijo">`
      // for (let i = 0; i < res.length; i++) {
      //   stringTemp += `<button class="buttonToClick" (click)="cambiarIdPagina(${res[i].url})">${res[i].titulomenu}</button>`;
      // }
      // stringTemp += `</div>`

      // this.barraLinks = this.sanitizer.bypassSecurityTrustHtml(stringTemp);
    });
  }

  traerPost(categoria: string) {
    console.log("Llamado a traer post");
    this.http.get<Post[]>("http://localhost:8888/posts/porcategoria/" + categoria).subscribe((res) => {

      this.listaPosts = res;
      this.postAPasar = res[0];
      //console.log(res)

      //this.cargarPosts();
    })
  }


  async cargarPosts() {



    for (let i = 0; i < this.listaPosts.length; i++) {

      var post = this.listaPosts[i];

      this.contenidoPagina += `
      <h3>${post.titulopost}</h3>
      <div class="descripcion-post">
      ${post.descripcion}
      </div>
      <p>Creado por: <strong>${post.usuario}</strong> </p>
      <br>
      <hr>
      `;

      var shortcuts = this.shortcut.extraerJsons(post.descripcion);


      //console.log(shortcuts)
      var elemento = null;

      for (let j = 0; j < shortcuts.length; j++) {

        elemento = null;
        elemento = shortcuts[j];
        //console.log(elemento)

        //console.log(JSON.stringify(elemento.json))

        switch (elemento.json.tipo) {

          case "imagen":
            console.log("Imagen")

            //convierto el observable en promesa y asi puedo usar await para esperar el resultado
            var res = await this.shortcut.traerArchivo(elemento.json._id).toPromise();

            this.intercambiar(JSON.stringify(elemento.json), `<img src="${res.url}"  height="170" width="170">`);

            break;

          case "video":
            console.log("Video")

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
        }
      }
    }

  }


  intercambiar(viejo: string, nuevo: string) {
    console.log(viejo)
    this.contenidoPagina = this.contenidoPagina.replace(viejo.trim(), nuevo);
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

    console.log(resJson);

    if (resJson.tipo == "dinamica") {
      this.esPaginaEstatica = false;

      this.contenidoPagina += `<h3>${resJson.descripcion}</h3>`
     

      //traer los post con la categoria de la pagina
      this.traerPost(resJson.categoria)

    } else if (resJson.tipo == "estatica") {
      this.esPaginaEstatica = true;

      console.log("estatica")

      this.contenidoPagina = resJson.contenido;

    }


  }


  public ccsContenidoPagina = `p{
    color:green;
  }`

  public contenidoPagina = `

  <link rel="stylesheet" href="http://localhost:8888/estilos/pagina1.css">
  <p>Mi primer pagina</p>
  `

}
