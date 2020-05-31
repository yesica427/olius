import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MensajesService } from '../mensajes.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor(private http: HttpClient, public mensajeService: MensajesService) { }
  public contentCSS = `p{color:black;}`;

  public contentJS;
  public contentHTML = `<p>Hola, mundo</p>`;



  //opciones para el editor froala
  public options: Object = {
    placeholderText: "Escriba algo aquí.",
    charCounterCount: false,
  };



  ngOnInit(): void {
    this.traerEncabezado();
  }

  encabezado;
  traerEncabezado() {
    this.http.get("http://localhost:8888/configuracion/encabezado").subscribe((res) => {
      var resJSON = JSON.parse(JSON.stringify(res));

      console.log(resJSON)

      if (resJSON == null) {
        // no existe el documento de encabezado
        console.log("No existe encabezado")

        //crear el documento encabezado
        var encabezado = {
          html: "<p>Hola, mundo</p>",
          css: "p{color:black}",
          nombre: "encabezado"
        }
        this.http.post("http://localhost:8888/configuracion", encabezado).subscribe((res) => {

          this.contentCSS = encabezado.css;
          this.contentHTML = encabezado.html
        });


      }
      else {
        console.log("Existe")

        this.contentCSS = resJSON.css;
        this.contentHTML = resJSON.html
      }
    });
  }

  guardar() {

    console.log(this.contentHTML)
    console.log(this.contentCSS)

    var encabezado = {
      html: this.contentHTML,
      css: this.contentCSS
    };


    this.http.put("http://localhost:8888/configuracion/encabezado", encabezado).subscribe((res) => {

      var resJSON = JSON.parse(JSON.stringify(res));

      console.log(resJSON);

      this.mensajeService.mostrarMensaje(2500, "Editado exitosamente.");

    });
  }

}
