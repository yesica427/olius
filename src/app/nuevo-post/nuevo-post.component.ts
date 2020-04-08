import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nuevo-post',
  templateUrl: './nuevo-post.component.html',
  styleUrls: ['./nuevo-post.component.css']
})
export class NuevoPostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public options: Object = {
    placeholderText: 'Escriba algo aquí.',
    charCounterCount: false,
    language: 'es'
  }

}
