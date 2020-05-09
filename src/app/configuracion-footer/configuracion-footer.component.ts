import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion-footer',
  templateUrl: './configuracion-footer.component.html',
  styleUrls: ['./configuracion-footer.component.css']
})
export class ConfiguracionFooterComponent implements OnInit {

  constructor() { }

  public contentCSS = `p{color:black;}`;

  public contentJS;
  public contentHTML;


  public contenidoEditor: string = "Escriba una descripción para su pie de pagina";



  public options: Object = {
    placeholderText: "Escriba algo aquí.",
    charCounterCount: false,
  };

  ngOnInit(): void {
  }

}
