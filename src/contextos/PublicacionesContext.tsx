import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

import type { Publicacion } from "../interfaces/publicacion";
import { obtenerGatos } from "../servicios/apigatos";

// Forma de los datos y funciones que expone el contexto
interface ContextoPublicaciones {
  publicaciones: Publicacion[];
  // publicaciones distintas, usadas únicamente en el mosaico del perfil propio
  publicacionesPerfil: Publicacion[];
  cargando: boolean;
  // busca una publicación por id, tanto en el feed como en el perfil
  buscarPorId: (id: number) => Publicacion | undefined;
  // agrega o quita el like de una publicación, y actualiza el contador
  alternarLike: (id: number) => void;
}

// se crea el contexto con un valor inicial vacío
const PublicacionesContext = createContext<ContextoPublicaciones | undefined>(
  undefined
);

// Proveedor que envuelve la aplicación y comparte las publicaciones
// entre todas las pantallas (Feed, Detalle y Perfil), para que el
// estado de "me gusta" sea el mismo sin importar desde dónde se mire
function PublicacionesProvider({ children }: { children: ReactNode }) {
  // estado con las publicaciones del feed principal
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

  // estado con las publicaciones del mosaico del perfil propio
  // (son distintas a las del feed, aunque vengan de la misma API)
  const [publicacionesPerfil, setPublicacionesPerfil] = useState<Publicacion[]>([]);

  // estado que indica si todavía se están cargando los datos
  const [cargando, setCargando] = useState(true);

  // se ejecuta una sola vez, al renderizar la app por primera vez,
  // y realiza dos peticiones asíncronas independientes mediante axios:
  // una tanda de fotos para el feed y otra distinta para el perfil
  useEffect(() => {
    const cargarPublicaciones = async () => {
      try {
        const [gatosFeed, gatosPerfil] = await Promise.all([
          obtenerGatos(),
          obtenerGatos(),
        ]);

        setPublicaciones(gatosFeed);

        // se corren los ids +1000 para que nunca choquen con los del feed
        const perfilConIdsUnicos = gatosPerfil.map((publicacion) => ({
          ...publicacion,
          id: publicacion.id + 1000,
        }));
        setPublicacionesPerfil(perfilConIdsUnicos);
      } catch (error) {
        console.log("Error al obtener las publicaciones:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarPublicaciones();
  }, []);

  // busca una publicación puntual por su id, revisando primero el feed
  // y después el perfil (los ids nunca se repiten entre ambas listas)
  const buscarPorId = useCallback(
    (id: number) =>
      publicaciones.find((publicacion) => publicacion.id === id) ??
      publicacionesPerfil.find((publicacion) => publicacion.id === id),
    [publicaciones, publicacionesPerfil]
  );

  // función interna reutilizable: alterna el like dentro de un array dado
  const alternarLikeEnLista = (
    lista: Publicacion[],
    id: number
  ): Publicacion[] =>
    lista.map((publicacion) => {
      if (publicacion.id !== id) {
        return publicacion;
      }

      const nuevoTieneLike = !publicacion.tieneLike;

      return {
        ...publicacion,
        tieneLike: nuevoTieneLike,
        cantidadLikes: nuevoTieneLike
          ? publicacion.cantidadLikes + 1
          : publicacion.cantidadLikes - 1,
      };
    });

  // agrega o quita el like de una publicación específica,
  // sin importar si pertenece al feed o al perfil
  const alternarLike = useCallback((id: number) => {
    setPublicaciones((actuales) => alternarLikeEnLista(actuales, id));
    setPublicacionesPerfil((actuales) => alternarLikeEnLista(actuales, id));
  }, []);

  return (
    <PublicacionesContext.Provider
      value={{
        publicaciones,
        publicacionesPerfil,
        cargando,
        buscarPorId,
        alternarLike,
      }}
    >
      {children}
    </PublicacionesContext.Provider>
  );
}

// hook para consumir el contexto desde cualquier pantalla o componente
function usarPublicaciones(): ContextoPublicaciones {
  const contexto = useContext(PublicacionesContext);

  if (!contexto) {
    throw new Error(
      "usarPublicaciones debe usarse dentro de un PublicacionesProvider"
    );
  }

  return contexto;
}

export { PublicacionesProvider, usarPublicaciones };
