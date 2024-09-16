import { Autores } from "./autores";

export interface Libro {
  id: number;
    titulo: string;
    autor_id: number;
    anio: string;
    genero: string;
    idioma: string;
    descripcion: string;
    created_at: string;
    updated_at: string;
    autor: Autores;
}
