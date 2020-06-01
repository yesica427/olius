import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.crearUsuarioAdmin();
  }

  crearUsuarioAdmin() {
    this.http.get("http://localhost:8888/usuarios/obtener/cuenta").subscribe((res) => {

      var resJson = JSON.parse(JSON.stringify(res));

      if (resJson.cuenta == 0) {
        // si no existe usuario administrador en la base, crea uno

        var usuarioAdmin = {
          "primernombre": "Erick",
          "segundonombre": "Vladimir",
          "primerapellido": "Reyes",
          "segundoapellido": "Marin",
          "contrasena": "asD.4567",
          "identidad": "0801199000455",
          "correo": "erick@gmail.com",
          "rol": 1
        }

        this.http.post("http://localhost:8888/usuarios/", usuarioAdmin).subscribe((res) => {
          console.log(res)
        })

      }
    });
  }

}
