export interface Books {
    titulo: string;
    autor: string;
    aniopublicacion?: number;
    genero?: string;
    cantidaddisponible: number;
    codigoISBN: number;
  }

  export interface Usuario {
    nombre: string;
    apellido: string;
    id: number;
    cantidadPrestada: number;
  } 