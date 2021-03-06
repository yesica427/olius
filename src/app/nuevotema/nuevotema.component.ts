import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tema } from '../tema.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MensajesService } from '../mensajes.service';

@Component({
  selector: 'app-nuevotema',
  templateUrl: './nuevotema.component.html',
  styleUrls: ['./nuevotema.component.css']
})
export class NuevotemaComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, public mensajeService: MensajesService) { }
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


  ngOnInit(): void {
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
      async (res) => {

        var resJson = JSON.parse(JSON.stringify(res));

        if (resJson.result == "ok") {

          this.mensajeService.mostrarMensaje(1500, "Creado exitosamente.");

          await new Promise(resolve => setTimeout(resolve, 1500));


          //cuando se guarda, redireccionar a todos los posts
          this.router.navigateByUrl('/admin/temas');
        }
      },
      (err) => console.log(err)
    )


  }


}
