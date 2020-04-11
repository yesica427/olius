import { Component, OnInit } from '@angular/core';
import {Post} from '../post.model';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public listaPost:Post[];

  ngOnInit() {

    this.traerPost();
  }

/*metodo de traer post*/

traerPost(){

  this.http.get<Post[]>('http://localhost:8888/posts').subscribe(
    (res)=>{console.log(res)
    this.listaPost=res;
    }
  )

}



eliminarPost(idpost:string){
  this.http.delete('http://localhost:8888/posts/'+idpost).subscribe(
    (res)=>{console.log(res)

      this.traerPost();
    }
  )



  
}








}
