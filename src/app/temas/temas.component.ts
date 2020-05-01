import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Tema } from "../tema.model";

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  public listaTemas: Tema[];

  constructor(private http: HttpClient, private _sanitizer: DomSanitizer) { }

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

}
