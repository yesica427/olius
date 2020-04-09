import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crearpagina',
  templateUrl: './crearpagina.component.html',
  styleUrls: ['./crearpagina.component.css']
})
export class CrearpaginaComponent implements OnInit {

  constructor() { }

  public contentJS;
  public contentHTML;
  public contentCSS;

  ngOnInit(): void {
  }

}
