import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login.service';
import { Usuario } from 'src/app/usuario.model';
import { Pagina } from '../pagina.model';
import { Archivo } from '../archivo.model';
import { Post } from '../post.model';
import { Comentario } from '../post.model';
import { LintStateOptions } from 'codemirror';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private loginService: LoginService ,private http: HttpClient) { }

  public usuarioActual: Usuario;
  
  public listaLinks: Pagina[];
  public listaArchivos: Archivo[];
  public listaUsuarios: Usuario[];
  public listaPost: Post[];
  public listaComentarios:Comentario[]=[];
  public listaImagenes:Archivo[];

 
  

  ngOnInit() {
    this.usuarioActual = this.loginService.traerUsuarioActual();
    this.traerLinksPaginas();
    this.traerArchivos();
    this.traerUsuarios();
    this.traerPost();
  }

  public contar:any="";
  public contarArchivos:any="";
  public contarUsuarios:any="";
  public contarPosts:any="";
  public contarComentarios:any="";
  public contarImagenes:any="";
  public comentariosPermitido:any="";

  traerLinksPaginas() {
    this.http.get<Pagina[]>("http://localhost:8888/paginas/get/links").subscribe((res) => {

     

      this.listaLinks = res;
      this.contar=res.length;
      console.log(this.contar);

}
);



}



traerArchivos() {
  this.http.get<Archivo[]>("http://localhost:8888/archivos/").subscribe((res) => {
    console.log(res);
    this.listaArchivos = res;
   this.contarArchivos=res.length;
   console.log(this.contarArchivos);

   this.listaImagenes=this.listaArchivos.filter((elemento)=>{
    return elemento.tipo=="imagen";
   
  });
  this.contarImagenes=this.listaImagenes.length;
  console.log("imagenes" +this.contarImagenes);
})
}



traerUsuarios() {
  this.loginService.traerUsuarios().subscribe((usuarios) => {

    this.listaUsuarios = usuarios;
    console.log(this.listaUsuarios)
    this.contarUsuarios=this.listaUsuarios.length
  });
}


traerPost() {

  this.http.get<Post[]>('http://localhost:8888/posts').subscribe(
    (res) => {
      console.log(res)
      this.listaPost = res;
      this.contarPosts=res.length


      this.comentariosPermitido=this.listaPost.filter((elemento)=>{
        return elemento.permitecomentario==true;

      });
      this.comentariosPermitido=this.comentariosPermitido.length;
      console.log("comentario" +this.comentariosPermitido);
     
    }


    
  )

}


}