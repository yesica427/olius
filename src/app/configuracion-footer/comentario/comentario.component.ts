import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comentario } from '../post.model';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  @Input()
  public comentario: Comentario;

  @Output() onReportarComentario = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }


  reportarComentario() {
    this.onReportarComentario.emit(this.comentario);
    this.comentario.reportado = true;
  }

}
