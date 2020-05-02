import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Tema } from "../tema.model";

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {
  display = 'none';

  public listaTemas: Tema[];

  constructor(private http: HttpClient, private _sanitizer: DomSanitizer,private router: Router) { }

  public contentJS = `console.log("Hola, mundo")`;
  public contentCSS = `p{color:black;}`;


  images = [];
  multipleImages = [];


  cuentaIncorrecta: boolean = false;

  seleccionarFotosMultiples(event) {



    this.multipleImages = [];

    this.images = [];


    if (event.target.files.length >= 3) {

      this.cuentaIncorrecta = false;

      this.multipleImages = event.target.files;

      //anadir los archivos  al formulario
      this.formularioTema.patchValue({
        fileSource: this.multipleImages
      });
    } else {
      this.cuentaIncorrecta = true;
      console.log("Seleccione mas de 3 imagenes por favor")
    }

    //carga la previsualacion de las fotos
    if (event.target.files && event.target.files[0]) {

      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {

        var reader = new FileReader();

        reader.onload = (event: any) => {

          this.images.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);

      }
    }
  }











  close() {
    this.display = 'none';
  }


  ngOnInit(): void {

    this.traerTemas()
  }



  traerTemas() {
    this.http.get<Tema[]>("http://localhost:8888/temas/").subscribe((res) => {
      this.listaTemas = res;

      console.log(this.listaTemas);
    });
  }

  getBackground(image) {
    console.log(image)
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }



  openModal() {
    this.display = "block";
  }


  formularioTema = new FormGroup({
    titulo: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),

    descripcion: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });


  get f() {
    return this.formularioTema.controls;
  }


  get titulo() {
    return this.formularioTema.get("titulo");
  }



  get descripcion() {
    return this.formularioTema.get("descripcion");
  }

  validarContenidoCSS() {

    if (this.contentCSS.length > 1) {
      return true;
    }
    else {
      return false;
    }
  }

  validarContenidoJS() {

    if (this.contentJS.length > 1) {
      return true;
    }
    else {
      return false;
    }
  }


  guardarTema() {

    const formData = new FormData();

    //guarda los archivos en el formData
    for (let img of this.multipleImages) {
      formData.append('files', img);
    }

    //al formData le anexo los demas campos del tema
    formData.append('titulo', this.formularioTema.get('titulo').value);
    formData.append('descripcion', this.formularioTema.get('descripcion').value);
    formData.append('css', this.contentCSS);
    formData.append('js', this.contentJS);

    var usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    var usuario = usuarioActual.primernombre + " " + usuarioActual.primerapellido;

    formData.append('usuario', usuario);


    this.http.post<any>('http://localhost:8888/temas/', formData).subscribe(
      (res) => {

        var resJson = JSON.parse(JSON.stringify(res));

        if (resJson.result == "ok") {

          //cuando se guarda, redireccionar a todos los posts
          this.router.navigateByUrl('/admin/temas');
        }
      },
      (err) => console.log(err)
    )


  }








}
 