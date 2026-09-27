import type { Usuario } from "../interfaces/usuario";

// datos simulados del usuario actual de la aplicacion
export const usuarioActual: Usuario = {
  nombreUsuario: "juanse.carus",
 fotoPerfil: require("../../assets/foto-perfil.jpg"),
  
  biografia: "Siempre siempre, nunca nunca✨\nBoca Juniors 💙💛\n#AguanteBoca\n#FlechaSosCrack", 
  publicaciones: 10,
  seguidores: 248,  
  seguidos: 180,
};
// interface local para tipar las sugerencias de usuarios a seguir
export interface Sugerencia {
  id: number;
  usuario: string;
  nombre: string;
}

// lista de sugerencias mostradas en la pantalla de perfil
export const sugerencias: Sugerencia[] = [
  { id: 1, usuario: "Lucas.Chechik", nombre: "Seguido por amante_gatos_1" },
  { id: 2, usuario: "Flecha.elmejorprofe", nombre: "Nuevo en Instagram" },
  { id: 3, usuario: "Messi.10", nombre: "Seguido por gatito_02" },
  { id: 4, usuario: "gabi.stanca", nombre: "Sugerido para ti" },
];
