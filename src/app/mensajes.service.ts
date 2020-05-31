import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  mensajeRegistro: string = "Exitoso";
  displayMensaje: string = "none";

  constructor() { }


  async mostrarMensaje(ms: number, mensaje: string) {

    this.mensajeRegistro = mensaje;

    this.displayMensaje = "block";

    await new Promise(resolve => setTimeout(resolve, ms));

    this.displayMensaje = "none";

  }
}
