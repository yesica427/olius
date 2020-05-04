import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  constructor() { }
  public contentCSS = `p{color:black;}`;

  public contentJS;
  public contentHTML;


  public contenidoEditor: string = "Escriba una descripción para su encabezado";

  //opciones para el editor froala
  public options: Object = {
    placeholderText: "Escriba algo aquí.",
    charCounterCount: false,
  };

 

  ngOnInit(): void {
  }

}
