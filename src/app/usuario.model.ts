export class Usuario {
    _id: string;
    primernombre: string;
    segundonombre: string;
    primerapellido: string;
    segundoapellido: string;
    contrasena: string;
    correo: string;
    identidad: string;
    rol: number

    constructor(

        primerNombre: string,
        segundoNombre: string,
        PrimerApellido: string,
        segundoApellido: string,
        contrasena: string,
        correo: string,
        identidad: string,
        rol: number
    ) {


        this.primernombre = primerNombre;
        this.segundonombre = segundoNombre;
        this.primerapellido = PrimerApellido;
        this.segundoapellido = segundoApellido;
        this.contrasena = contrasena;
        this.correo = correo;
        this.identidad = identidad;
        this.rol = rol

    }

}