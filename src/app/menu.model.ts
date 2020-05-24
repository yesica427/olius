export class Menu {
    _id: string;
    titulo: string;
    opciones: OpcionMenu[];
    css: string;
    usuario: string;
}


export class OpcionMenu {
    tipo: string;
    valor: string;
    nombre: string;
}