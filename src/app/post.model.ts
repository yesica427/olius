export class Post {
    _id: string;
    titulopost: string;
    categoria: string;
    descripcion: string;
    usuario: string;
    permitecomentario: boolean;
    comentarios: Comentario[];
    fecha: Date;




}


export class Comentario {

    idcomentario: number;
    usuario: string;
    comentario: string;
}