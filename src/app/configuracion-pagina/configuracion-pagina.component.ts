import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-configuracion-pagina',
  templateUrl: './configuracion-pagina.component.html',
  styleUrls: ['./configuracion-pagina.component.css']
})
export class ConfiguracionPaginaComponent implements OnInit {



  constructor(private http: HttpClient) { }
  public contentJS = `console.log("Hola, mundo")`;
  public contentCSS = `p{color:black;}`;

  ngOnInit(): void {

    this.obtenerPaginaPrincipal()
  }

  paginaPrincipal = null;

  urlLogotipo = "";
  urlFavicon = "";

  obtenerPaginaPrincipal() {
    this.http.get("http://localhost:8888/paginas/1").subscribe((res) => {
      var resJSON = JSON.parse(JSON.stringify(res));

      this.paginaPrincipal = resJSON;

      console.log(this.paginaPrincipal)

      if (res == null) {
        console.log("No existe pagina principal")
        this.http.post("http://localhost:8888/paginas/", {
          "titulo": "Pagina principal",
          "titulomenu": "Pagina principal",
          "descripcion": "Descripcion de la pagina principal",
          "tipo": "estatica",
          "contenido": "<p>Contenido de la pagina principal</p>",
          "palabrasclave": [
            " inicio"
          ],
          "activa": true,
          "url": 1,
          "encabezado": true,
          "footer": true,
          "favicon": "http://localhost:8888/configuracion/favicon.jpg",
          "logotipo": "http://localhost:8888/configuracion/logotipo.png",
          "css": "p{color:red;}",
          "js": `console.log("Hola, mundo")`,
          "publica": true
          
        }).subscribe((res) => {
          this.obtenerPaginaPrincipal();
        })
      } else {

        this.contentCSS = resJSON.css;
        this.contentJS = resJSON.js;
        this.contenidoEditor = resJSON.contenido;
        this.formularioConfiguracionPagina.get('titulo').setValue(resJSON.titulo);
        this.formularioConfiguracionPagina.get('descripcion').setValue(resJSON.descripcion);
        this.formularioConfiguracionPagina.get('palabrasclave').setValue(resJSON.palabrasclave.join());

        this.urlFavicon = this.paginaPrincipal.favicon;
        this.urlLogotipo = this.paginaPrincipal.logotipo;

      }


    })
  }


  //opciones para el editor froala
  public options: Object = {
    placeholderText: "Escriba algo aquí.",
    charCounterCount: false,
  };

  //aqui se guarda el contenido del editor
  public contenidoEditor: string = "Ingrese un contenido a su página";

  validarContenidoEditor() {
    if (this.contenidoEditor.length < 2) {
      return false;
    }
    else {
      return true;
    }
  }

  validarContenidoJS() {
    if (this.contentJS.length < 2) {
      return false;
    }
    else {
      return true;
    }
  }


  validarContenidoCSS() {
    if (this.contentCSS.length < 2) {
      return false;
    }
    else {
      return true;
    }
  }


  formularioConfiguracionPagina = new FormGroup({
    titulo: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),

    descripcion: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),

    palabrasclave: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
  });



  get titulo() {
    return this.formularioConfiguracionPagina.get("titulo");
  }


  get descripcion() {
    return this.formularioConfiguracionPagina.get("descripcion");
  }

  get palabrasclave() {
    return this.formularioConfiguracionPagina.get("palabrasclave");
  }

  listaImagenes = [];


  guardar() {


    var palabrasclave = this.formularioConfiguracionPagina.get('palabrasclave').value;

    var paginaPrincipal = {
      titulo: this.formularioConfiguracionPagina.get('titulo').value,
      descripcion: this.formularioConfiguracionPagina.get('descripcion').value,
      palabrasclave: palabrasclave.split(","),
      css: this.contentCSS,
      js: this.contentJS,
      contenido: this.contenidoEditor
    };


    console.log(paginaPrincipal);


    this.http.put("http://localhost:8888/paginas/modificar/paginaprincipal", paginaPrincipal).subscribe((res) => {
      console.log(res)
    })
  }


  favicon;

  formularioFavicon = new FormGroup({
    file: new FormControl('', [Validators.required])
  });

  get fav() {
    return this.formularioFavicon.controls;
  }

  faviconPrecargado;
  precargaFavicon = false;
  cambioFavicon(event) {
    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      this.favicon = file;


      if (event.target.files && event.target.files[0]) {

        var filesAmount = event.target.files.length;

        for (let i = 0; i < filesAmount; i++) {

          var reader = new FileReader();

          reader.onload = (event: any) => {

            this.faviconPrecargado = event.target.result;
          }

          reader.readAsDataURL(event.target.files[i]);

        }
      }

    }
  }



  subirFavicon() {

    const formData = new FormData();


    formData.append('file', this.favicon);

    this.http.put("http://localhost:8888/configuracion/modificar/favicon/", formData).subscribe((res) => {


      var resJSON = JSON.parse(JSON.stringify(res));

      if (resJSON.ok) {
        this.precargaFavicon = true;
      }
    })

  }



  logotipo;

  formularioLogotipo = new FormGroup({
    file: new FormControl('', [Validators.required])
  });

  get logo() {
    return this.formularioLogotipo.controls;
  }


  logotipoPrecargado;
  precargaLogotipo = false;
  cambioLogo(event) {
    const file = event.target.files[0];

    this.logotipo = file;

    if (event.target.files && event.target.files[0]) {

      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {

        var reader = new FileReader();

        reader.onload = (event: any) => {

          this.logotipoPrecargado = event.target.result;
        }

        reader.readAsDataURL(event.target.files[i]);

      }
    }
  }

  subirLogotipo() {

    const formData = new FormData();


    formData.append('file', this.logotipo);

    this.http.put("http://localhost:8888/configuracion/modificar/logo/", formData).subscribe((res) => {
      var resJSON = JSON.parse(JSON.stringify(res));

      if (resJSON.ok) {
        this.precargaLogotipo = true;
      }


    })

  }
}
