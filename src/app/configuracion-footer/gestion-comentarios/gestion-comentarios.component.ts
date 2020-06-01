import { Component, OnInit } from '@angular/core';
import { Post, Comentario } from '../post.model';
import { Comentarios } from '../comentarios.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestion-comentarios',
  templateUrl: './gestion-comentarios.component.html',
  styleUrls: ['./gestion-comentarios.component.css']
})
export class GestionComentariosComponent implements OnInit {

  constructor(private http: HttpClient) { }


  public postActual: Post;
  public listaPost: Post[];
  public listaComentarios: Comentario[] = [];
  public listaReportados: Comentario[] = [];



  itemactivo: boolean = false;
  public filtro;
  ngOnInit(): void {

    this.traerPost();



  }


  // activar(){
  //   this.itemactivo=true;
  // }



  traerPost() {

    this.http.get<Post[]>('http://localhost:8888/posts').subscribe(
      (res) => {
        console.log(res)
        this.listaPost = res;

      }
    )

  }




  traerComentarios(idpost: string) {
    this.itemactivo = true;


    this.http.get<Post[]>('http://localhost:8888/comentarios/' + idpost).subscribe(
      (res) => {
        console.log(res)
        this.postActual = res[0];
        this.listaComentarios = this.postActual.comentarios;
        this.listaReportados = this.listaComentarios.filter((elemento) => {
          return elemento.reportado == true;
          console.log(this.listaReportados)
        });
      }
    )
  }





  eliminarComentario(idcomentario: number) {
    this.http.delete("http://localhost:8888/comentarios/" + this.postActual._id + "/" + idcomentario).subscribe((res) => {
      console.log(res);
      console.log(idcomentario);
      console.log(this.postActual._id);

      this.traerComentarios(this.postActual._id);

    })
  }



  reportarComentario(comentario: Comentario) {

    console.log(comentario);

    console.log(this.postActual);

    this.http.put(`http://localhost:8888/comentarios/${this.postActual._id}/${comentario.idcomentario}`, {}).subscribe((res) => {
      console.log(res)
    });
  }




  /*comentarios reportados*/















}
