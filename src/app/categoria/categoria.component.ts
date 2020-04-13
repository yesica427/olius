import { Component, OnInit } from '@angular/core';
import {Categorias} from '../categorias.model';
import { HttpClient } from '@angular/common/http';
import {FormControl,FormGroup,Validators} from '@angular/forms';



@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public listaCategorias:Categorias[];

  ngOnInit() {

    
    this.traerCategorias();
  }


  traerCategorias(){

    this.http.get<Categorias[]>('http://localhost:8888/categorias').subscribe(
      (res)=>{console.log(res)
      this.listaCategorias=res;
      }
    )
  
  }





  eliminarCategorias(idCategoria:string){
    this.http.delete('http://localhost:8888/categorias/'+idCategoria).subscribe(
      (res)=>{console.log(res)
  
        this.traerCategorias();
      }
    );
  }




  categoriasForm = new FormGroup({
    nombreCategorias: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      
    ]),


    descripcion:new FormControl("",[Validators.required,Validators.minLength(5)]),
  });


  get nombreCategorias() {
    return this.categoriasForm.get("nombreCategorias");
  }



  get descripcion(){
    return this.categoriasForm.get("descripcion");
  }


    /*editarcategoria*/

     public categoriaEditar:Categorias;


     editarCategorias(categorias:Categorias){
       this.categoriaEditar=categorias;
       this.categoriasForm.get('nombreCategorias').setValue(categorias.nombrecategoria);
       this.categoriasForm.get('descripcion').setValue(categorias.descripcion);
      
    
     }








/*gurdar categorias*/

guardarCategorias(){

var nombrecategoria = this.categoriasForm.value.nombreCategorias;
var descripcioncategoria= this.categoriasForm.value.descripcion;




var nuevaCategoria = new Categorias();
nuevaCategoria.nombrecategoria = nombrecategoria;
nuevaCategoria.descripcion= descripcioncategoria;


  this.http.put('http://localhost:8888/categorias/'+ this.categoriaEditar._id ,nuevaCategoria).subscribe(
    (res)=>{console.log(res)
    this.traerCategorias() 
  }
  )



  

  //TODO: Hacer el llamado a  la base y mandar el post


  console.log(nuevaCategoria);


  }

}
