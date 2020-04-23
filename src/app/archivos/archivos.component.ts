import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Categorias } from '../categorias.model';
import { Archivo } from '../archivo.model';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {
  display = 'none';
  estado = 'desactivo';

  backendURL = 'http://localhost:8888/archivos';


  public listaCategorias: Categorias[];

  public listaArchivos: Archivo[];



  constructor(private http: HttpClient) { }
  close() {
    this.display = 'none';
  }

  ngOnInit() {
    this.traerCategorias();
    this.traerArchivos();
  }

  traerArchivos() {
    this.http.get<Archivo[]>("http://localhost:8888/archivos/").subscribe((res) => {
      console.log(res);
      this.listaArchivos = res;
      this.copiaListaArchivos = res;

    });
  }

  openModal() {
    this.display = "block";
  }


  archivosForm = new FormGroup({
    // url: new FormControl("", [
    //   Validators.required,
    // ]),

    titulo: new FormControl("", [Validators.required, Validators.minLength(5)]),
    //categoria: new FormControl("", [Validators.required, Validators.minLength(5)]),
    descripcion: new FormControl("", [Validators.required, Validators.minLength(5)]),
    // urlcaratula: new FormControl("", [Validators.required]),
    // tipo: new FormControl("", [Validators.required, Validators.minLength(5)]),
    //shorcut: new FormControl("", [Validators.required, Validators.minLength(5)]),

    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required])
  });



  get f() {

    return this.archivosForm.controls;

  }

  dataArchivo = {
    nombre: "",
    tipo: "",
    titulo: "",
    categoria: "",
    descripcion: "",
  };

  onFileChange(event) {

    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      console.log(event.target.files[0]);

      this.dataArchivo.nombre = event.target.files[0].name;
      this.dataArchivo.tipo = event.target.files[0].type;



      this.existeArchivo = this.revisarSiNoExisteArchivo(event.target.files[0].name);

      this.archivosForm.patchValue({
        fileSource: file
      });
    }
  }

  existeArchivo: boolean = false;

  revisarSiNoExisteArchivo(nombrearchivo) {
    var filtrado = this.listaArchivos.filter((archivo) => {
      return archivo.nombrearchivo == nombrearchivo
    })

    if (filtrado.length == 0) {
      return false;
    }
    else {
      return true;
    }
  }



  get titulo() {
    return this.archivosForm.get("titulo");
  }



  // get categoria() {
  //   return this.archivosForm.get("categoria");
  // }


  get descripcion() {
    return this.archivosForm.get("descripcion");
  }



  // get urlcaratula() {
  //   return this.archivosForm.get("urlcaratula");
  // }



  // get tipo() {
  //   return this.archivosForm.get("tipo");
  // }


  traerCategorias() {

    this.http.get<Categorias[]>('http://localhost:8888/categorias').subscribe(
      (res) => {

        this.listaCategorias = res;

      }
    )

  }

  guardarArchivo() {

    const formData = new FormData();

    formData.append('file', this.archivosForm.get('fileSource').value);

    formData.append("nombre", this.dataArchivo.nombre);
    formData.append("tipo", this.dataArchivo.tipo);
    formData.append("descripcion", this.archivosForm.value.descripcion)
    formData.append("titulo", this.archivosForm.value.titulo)
    formData.append("url", "http://localhost:8888/" + this.dataArchivo.nombre)


    var valorCategoria = (<HTMLSelectElement>(
      document.getElementById("select-categorias")
    )).value;

    formData.append("categoria", valorCategoria)


    this.http.post(this.backendURL, formData)

      .subscribe(res => {

        console.log(res);

        var resJson = JSON.parse(JSON.stringify(res))

        if (resJson.success == true) {
          console.log("Subido Exitosamente");


          //resetear el formulario
          this.archivosForm.get("titulo").reset();
          this.archivosForm.get("descripcion").reset()
          this.archivosForm.get('file').reset();
          this.traerArchivos();
          //this.close();
        }
      })

  }



  //modal editar y su formulario
  displayModalEditar = "none";

  public archivoEditar: Archivo = new Archivo();

  openModalEditar(archivo: Archivo) {

    this.archivoEditar = archivo;

    this.displayModalEditar = "block";

    this.archivosFormEditar.get('tituloEditar').setValue(archivo.titulo);
    this.archivosFormEditar.get('descripcionEditar').setValue(archivo.descripcion);

    var shortcut = `{"tipo":"${archivo.tipo}","_id":"${archivo._id}"}`
    this.archivosFormEditar.get('shortcut').setValue(shortcut);
  }

  closeModalEditar() {

    //this.archivoEditar = null;
    this.displayModalEditar = 'none';

  }

  archivosFormEditar = new FormGroup({

    tituloEditar: new FormControl("", [Validators.required, Validators.minLength(5)]),
    //categoria: new FormControl("", [Validators.required, Validators.minLength(5)]),
    descripcionEditar: new FormControl("", [Validators.required, Validators.minLength(5)]),
    // urlcaratula: new FormControl("", [Validators.required]),
    // tipo: new FormControl("", [Validators.required, Validators.minLength(5)]),
    shortcut: new FormControl("", [Validators.required, Validators.minLength(5)]),
  });


  get tituloEditar() {
    return this.archivosFormEditar.get("tituloEditar");
  }

  get shortcut() {
    return this.archivosFormEditar.get("shortcut");
  }

  get descripcionEditar() {
    return this.archivosFormEditar.get("descripcionEditar");
  }

  actualizarArchivo() {

    console.log("Click")

    var valores = this.archivosFormEditar.value;

    var categoria = (<HTMLSelectElement>(
      document.getElementById("select-categorias-editar")
    )).value;

    var archivoNuevo = new Archivo();
    archivoNuevo.titulo = valores.tituloEditar;
    archivoNuevo.descripcion = valores.descripcionEditar;
    archivoNuevo.categoria = categoria;


    this.http.put(this.backendURL + "/" + this.archivoEditar._id, archivoNuevo).subscribe((res) => {

      console.log(res);

      this.traerArchivos();
      this.closeModalEditar();
    });
  }

  eliminarArchivo() {

    console.log(this.backendURL + "/" + this.archivoEditar._id + "/" + this.archivoEditar.nombrearchivo);

    this.http.delete(this.backendURL + "/" + this.archivoEditar._id + "/" + this.archivoEditar.nombrearchivo).subscribe((res) => {
      console.log(res)

      var jsonRes = JSON.parse(JSON.stringify(res));

      if (jsonRes.ok == 1) {
        console.log("eliminado correctamente")

        this.closeModalEditar();
        this.traerArchivos();
      }
    })
  }


  copiaListaArchivos: Archivo[];
  filtro() {


    var Categoriaseleccionada = (<HTMLSelectElement>(
      document.getElementById("tipoarchivo")
    )).value;

    this.listaArchivos = this.copiaListaArchivos;

    if (Categoriaseleccionada != "null") {
      this.listaArchivos = this.listaArchivos.filter((archivo) => {
        return archivo.tipo == Categoriaseleccionada;
      });


    }

  }


  busquedanombre() {
    var valortitulo = (<HTMLSelectElement>(
      document.getElementById("busquedaArchivo")
    )).value;


    this.listaArchivos = this.copiaListaArchivos;


    if (valortitulo != "") {

      this.listaArchivos = this.listaArchivos.filter((archivo) => {
        return archivo.titulo.includes(valortitulo);
      });
    }
  }

}



