export interface Comentario {
    localizacion: string,
    itemComentario: {
        puntuacion: boolean,
        comentario?: string
    },
    consulta?: boolean
}
