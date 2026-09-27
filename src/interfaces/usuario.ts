// Estructura de datos que representa al usuario actual de la aplicación
import { ImageSourcePropType } from "react-native";
export interface Usuario {
  nombreUsuario: string;
  fotoPerfil: ImageSourcePropType;
  biografia: string;
  publicaciones: number;
  seguidores: number;
  seguidos: number;
}
