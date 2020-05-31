import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MensajesService } from '../mensajes.service';

@Component({
  selector: 'app-configuracion-footer',
  templateUrl: './configuracion-footer.component.html',
  styleUrls: ['./configuracion-footer.component.css']
})
export class ConfiguracionFooterComponent implements OnInit {

  constructor(private http: HttpClient, public mensajeService: MensajesService) { }

  public contentCSS = `p{color:black;}`;

  public contentJS;
  public contentHTML = `<p>Hola, mundo</p>`;



  ngOnInit(): void {

    this.traerFooter();
  }


  traerFooter() {
    this.http.get("http://localhost:8888/configuracion/footer").subscribe((res) => {

      var resJSON = JSON.parse(JSON.stringify(res));
      if (resJSON == null) {
        // no existe el documento de encabezado
        console.log("No existe footer")

        //crear el documento encabezado
        var footer = {
          html: "<p>Hola, mundo</p>",
          css: "p{color:black}",
          nombre: "footer"
        }
        this.http.post("http://localhost:8888/configuracion", footer).subscribe((res) => {

          this.contentCSS = footer.css;
          this.contentHTML = footer.html
        });


      }
      else {
        console.log("Existe")

        console.log(resJSON)

        this.contentCSS = resJSON.css;
        this.contentHTML = resJSON.html
      }
    });
  }

  guardar() {

    console.log(this.contentHTML)
    console.log(this.contentCSS)

    var footer = {
      html: this.contentHTML,
      css: this.contentCSS
    };


    this.http.put("http://localhost:8888/configuracion/footer", footer).subscribe((res) => {

      var resJSON = JSON.parse(JSON.stringify(res));

      console.log(resJSON);

      this.mensajeService.mostrarMensaje(2500, "Editado exitosamente.")

    });
  }

}
