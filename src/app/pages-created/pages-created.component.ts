import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { ShortcutService } from "../shortcut.service";
import { Post } from "../post.model";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-pages-created',
  templateUrl: './pages-created.component.html',
  styleUrls: ['./pages-created.component.css'],
})
export class PagesCreatedComponent implements OnInit {

  constructor(private shortcut: ShortcutService, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  listaPosts: Post[];

  //sobre esta variable se introducira el html de la pagina

  contenidoDivPost: string = `<h1>Lista de Posts:</h1>`;

  //guarda los parametros de la url
  params: Params;

  public idPagina = 0;

  ngOnInit(): void {



    this.getParametrosURL();

    this.traerPost();


  }

  //guarda los parametros url en this.params
  getParametrosURL() {

    this.route.queryParams.subscribe((params: Params) => {

      this.params = params;

      console.log('App params', params);

      const idpagina = params['idpagina'];

      console.log('idpagina', idpagina);

      this.idPagina = idpagina;
    });
  }

  traerPost() {
    this.http.get<Post[]>("http://localhost:8888/posts").subscribe((res) => {

      this.listaPosts = res;
      //console.log(res)

      this.cargarPosts();
    })
  }


  async cargarPosts() {

    for (let i = 0; i < this.listaPosts.length; i++) {

      var post = this.listaPosts[i];

      this.contenidoDivPost += `
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
    this.contenidoDivPost = this.contenidoDivPost.replace("<p>" + viejo.trim() + "</p>", nuevo);
  }


  cambiarIdPagina() {
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: { "idpagina": "2" } });
  }


  public ccsContenidoPagina = `p{
    color:green;
  }`

  public contenidoPagina = `

  <link rel="stylesheet" href="http://localhost:8888/estilos/pagina1.css">
  <p>Mi primer pagina</p>
  `

}
