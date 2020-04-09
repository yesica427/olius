import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-nuevo-post',
  templateUrl: './nuevo-post.component.html',
  styleUrls: ['./nuevo-post.component.css']
})
export class NuevoPostComponent implements OnInit {
  public listaDeCategorias = [
    { value: 1, nombre: "Deportes" },
    { value: 2, nombre: "Musica" },
    { value: 3, nombre: "Arte" },
    { value: 4, nombre: "Viajes" },

  ]

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  //formulario reactivo para el nombre del post
  nombrePostForm = new FormGroup({
    nombrePost: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  get nombrePost() {
    return this.nombrePostForm.get('nombrePost')
  }


  //opciones para el editor froala
  public options: Object = {
    placeholderText: 'Escriba algo aquí.',
    charCounterCount: false,

  }

  //aqui se guarda el contenido del editor
  public contenidoEditor: string = '';


  //validar que sea mayor que 2
  validarContenidoEditor() {

    return this.contenidoEditor.length > 2;
  }



  guardarPost() {
    //aqui guardo el option seleccionado en categorias
    var valorCategoria = (<HTMLSelectElement>document.getElementById('select-categorias')).value;

    //titulo del post, valor traido del formulario de nombre post
    var tituloPost = this.nombrePostForm.value.nombrePost;

    //verificar si quiere comentarios
    var element = <HTMLInputElement>document.getElementById("comentarios");
    var estaSeleccionado = element.checked;


    //creo el json
    var data = {
      titulo: tituloPost,
      contenido: this.contenidoEditor,
      categoria: valorCategoria,
      usuario: this.loginService.traerUsuarioActual(),
      fecha: new Date(),
      incluirComentarios: estaSeleccionado
    };

    console.log(data)

    //TODO: Hacer el llamado a  la base y mandar el post
  }

}
