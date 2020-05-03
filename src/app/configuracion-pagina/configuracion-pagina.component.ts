import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion-pagina',
  templateUrl: './configuracion-pagina.component.html',
  styleUrls: ['./configuracion-pagina.component.css']
})
export class ConfiguracionPaginaComponent implements OnInit {

  

  constructor() { }
  public contentJS = `console.log("Hola, mundo")`;
  public contentCSS = `p{color:black;}`;

  ngOnInit(): void {
  }

}
