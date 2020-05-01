import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../post.model';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  @Input()
  public comentario: Comentario;

  constructor() { }

  ngOnInit(): void {
  }

}
