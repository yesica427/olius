export class Usuario {
    id: number;
    primerNombre: string;
    segundoNombre: string;
    PrimerApellido: string;
    segundoApellido: string;
    contrasena: string;
    correo: string;
    identidad: string;
    estLoggeado: boolean;

    constructor(
        id: number,
        primerNombre: string,
        segundoNombre: string,
        PrimerApellido: string,
        segundoApellido: string,
        contrasena: string,
        correo: string,
        identidad: string,
        estLoggeado: boolean) {

        this.id = id;
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.PrimerApellido = PrimerApellido;
        this.segundoApellido = segundoApellido;
        this.contrasena = contrasena;
        this.correo = correo;
        this.identidad = identidad;
        this.estLoggeado = estLoggeado;


    }

}