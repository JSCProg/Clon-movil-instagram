// Estructura de datos que representa una publicación del feed
export interface Publicacion {
  id: number;
  idUsuario: string;
  nombreUsuario: string;
  ubicacion: string;
  imagenPerfil: string;
  imagenPublicacion: string;
  descripcion: string;
  cantidadLikes: number;
  fecha: string;
  comentarios: string[];
  // indica si el usuario actual le dio like a esta publicación
  tieneLike: boolean;
}
