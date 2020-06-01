import { Component, OnInit, Input } from '@angular/core';
import { Post, Comentario } from '../post.model';
import { ShortcutService } from '../shortcut.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  //recibe el objeto post como argumento
  @Input()
  public post: Post = new Post();

  constructor(private shortcut: ShortcutService, private http: HttpClient, private loginService: LoginService) { }

  ngOnInit(): void {
    this.cargarElementosEnPost()
    this.verificarUsuarioLogueado();
  }

  ngAfterViewInit() {

  }

  async cargarElementosEnPost() {

    var shortcuts = this.shortcut.extraerJsons(this.post.descripcion);

    console.log("Post component")
    console.log(shortcuts)


    //console.log(shortcuts)
    var elemento = null;

    for (let j = 0; j < shortcuts.length; j++) {

      elemento = null;
      elemento = shortcuts[j];

      switch (elemento.json.tipo) {

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
          console.log("galeria")

          var html = await this.traerGaleria(elemento.json.imagenes);
          console.log(html)

          this.intercambiar(JSON.stringify(elemento.json), html);
          break;


      }
    }
  }

  intercambiar(viejo: string, nuevo: string) {

    // this.post.descripcion = this.post.descripcion.replace("<p>" + viejo.trim() + "</p>", nuevo);
    this.post.descripcion = this.post.descripcion.replace(viejo.trim(), nuevo);

  }

  inputComentario: string;

  nuevoComentario() {
    var nuevoComentario = new Comentario();
    nuevoComentario.idcomentario = this.post.comentarios.length + 1;
    nuevoComentario.comentario = this.inputComentario;
    nuevoComentario.reportado = false;

    var usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    nuevoComentario.usuario = usuarioActual.primernombre + " " + usuarioActual.primerapellido;

    console.log(nuevoComentario)



    this.http.post("http://localhost:8888/posts/comentarios/" + this.post._id, nuevoComentario).subscribe((res) => {

      var resJson = JSON.parse(JSON.stringify(res));

      console.log(resJson.result.ok);

      if (resJson.result.ok == 1) {
        //si agrega el comentario

        this.post.comentarios.push(nuevoComentario);

      }
    })

    this.inputComentario = ""
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

  verificarUsuarioLogueado() {
    const usuarioActual = this.loginService.traerUsuarioActual();

    if (usuarioActual != null) {
      // usuario loguead
      return true;
    } else {
      return false;
    }
  }


  reportarComentario(event) {
    console.log("Reportar comentario: ", event);

    this.http.put(`http://localhost:8888/comentarios/${this.post._id}/${event.idcomentario}`, {}).subscribe((res) => {
      console.log(res)
    });
  }

}
