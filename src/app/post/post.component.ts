import { Component, OnInit, Input } from '@angular/core';
import { Post, Comentario } from '../post.model';
import { ShortcutService } from '../shortcut.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  //recibe el objeto post como argumento
  @Input()
  public post: Post = new Post();

  constructor(private shortcut: ShortcutService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarElementosEnPost()
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

  intercambiar(viejo: string, nuevo: string) {

    // this.post.descripcion = this.post.descripcion.replace("<p>" + viejo.trim() + "</p>", nuevo);
    this.post.descripcion = this.post.descripcion.replace(viejo.trim(), nuevo);

  }

  inputComentario: string;

  nuevoComentario() {
    var nuevoComentario = new Comentario();
    nuevoComentario.idcomentario = this.post.comentarios.length + 1;
    nuevoComentario.comentario = this.inputComentario;

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

}
