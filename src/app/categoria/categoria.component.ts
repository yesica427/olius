import { Component, OnInit } from '@angular/core';
import { Categorias } from '../categorias.model';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public listaCategorias: Categorias[];


  accion: string = "guardar";

  ngOnInit() {
    this.traerCategorias();

  }


  traerCategorias() {

    this.http.get<Categorias[]>('http://localhost:8888/categorias').subscribe(
      (res) => {
        console.log(res)
        this.listaCategorias = res;
        this.copiaCategorias=res;
      }
    )

  }


  eliminarCategorias(idCategoria: string) {
    this.http.delete('http://localhost:8888/categorias/' + idCategoria).subscribe(
      (res) => {
        console.log(res)

        this.traerCategorias();
      }
    );
  }


  categoriasForm = new FormGroup({
    nombreCategorias: new FormControl("", [
      Validators.required,
      Validators.minLength(5),

    ]),


    descripcion: new FormControl("", [Validators.required, Validators.minLength(5)]),
  });


  get nombreCategorias() {
    return this.categoriasForm.get("nombreCategorias");
  }

  get descripcion() {
    return this.categoriasForm.get("descripcion");
  }



  /*editarcategoria*/
  public categoriaEditar: Categorias;


  editarCategorias(categorias: Categorias) {

    this.categoriaEditar = categorias;

    // el boton en modo editar
    this.accion = "editar";

    this.categoriasForm.get('nombreCategorias').setValue(categorias.nombrecategoria);
    this.categoriasForm.get('descripcion').setValue(categorias.descripcion);

  }





  /*gurdar categorias*/

  guardarCategorias() {


    //si esta en modo guardar y categoriaeditar no tiene nada
    if (this.accion == "guardar" && this.categoriaEditar == null) {


      ///importante
      this.categoriaEditar = null;

      var nombrecategoria = this.categoriasForm.value.nombreCategorias;
      var descripcioncategoria = this.categoriasForm.value.descripcion;

      var nuevaCategoria = new Categorias();
      nuevaCategoria.nombrecategoria = nombrecategoria;
      nuevaCategoria.descripcion = descripcioncategoria;


      this.http.post('http://localhost:8888/categorias/', nuevaCategoria).subscribe(
        (res) => {
          console.log(res)
          this.traerCategorias();


          
          this.categoriasForm.get('nombreCategorias').reset();
          this.categoriasForm.get('descripcion').reset();
        }
      )
    }

    //si esta en modo editar y la variable categoriaeditar tiene algo
    else if (this.accion == "editar" && this.categoriaEditar != null) {

      var nombrecategoria = this.categoriasForm.value.nombreCategorias;
      var descripcioncategoria = this.categoriasForm.value.descripcion;

      var nuevaCategoria = new Categorias();
      nuevaCategoria.nombrecategoria = nombrecategoria;
      nuevaCategoria.descripcion = descripcioncategoria;

      //llamo el id de categoriaEditar
      this.http.put('http://localhost:8888/categorias/' + this.categoriaEditar._id, nuevaCategoria).subscribe(
        (res) => {
          console.log(res)
          this.traerCategorias();

          //importante
          //pongo otra vez el boton en modo guardar
          this.categoriaEditar = null;
          this.accion = "guardar"

          //le quito los valores a los inputs
          this.categoriasForm.get('nombreCategorias').reset();
          this.categoriasForm.get('descripcion').reset();

        }
      )
    }

  }



  copiaCategorias:Categorias[];

  busquedaNombrecategoria(){
    var categoriaseleccionada = (<HTMLSelectElement>(
      document.getElementById("iputBusqueda")
    )).value;
   
    
    

    this.listaCategorias=this.copiaCategorias;


    if (categoriaseleccionada !=""){
      
      this.listaCategorias=this.listaCategorias.filter((categorias) => {
        return categorias.nombrecategoria.includes(categoriaseleccionada);
      });
     
    


    }
  }





}
