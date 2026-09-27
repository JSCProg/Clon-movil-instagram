import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ParametrosStack } from "../navegacion/StackPrincipal";

// contexto compartido: acá se busca la publicación actualizada por id
// y se togglea el like usando la misma función que usa el Feed
import { usarPublicaciones } from "../contextos/PublicacionesContext";

// datos del usuario actual, usados cuando la publicación
// se abre desde el propio perfil
import { usuarioActual } from "../datos/usuario";

type PropsDetallePublicacion = NativeStackScreenProps<
  ParametrosStack,
  "DetallePublicacion"
>;

// Pantalla que muestra el detalle completo de una publicación,
// incluyendo comentarios y la posibilidad de dar/quitar like
function PantallaDetallePublicacion({ route }: PropsDetallePublicacion) {
  // se recibe el id de la publicación, y un flag opcional que indica
  // si se abrió desde el perfil propio del usuario
  const { id, deMiPerfil } = route.params;

  // se busca la publicación actualizada dentro del contexto,
  // así siempre refleja el like más reciente (venga de donde venga)
  const { buscarPorId, alternarLike } = usarPublicaciones();
  const publicacion = buscarPorId(id);

  // por seguridad, si por algún motivo no se encuentra la publicación
  // (por ejemplo, mientras se está recargando el contexto) no se rompe la pantalla
  if (!publicacion) {
    return <View style={estilos.contenedor} />;
  }

  // si la publicación se abrió desde el perfil propio, se muestran
  // el nombre y la foto del usuario actual en vez del autor original;
  // esto es solo visual, no modifica los datos compartidos del feed
  const nombreAMostrar = deMiPerfil
    ? usuarioActual.nombreUsuario
    : publicacion.nombreUsuario;
  const fuenteAvatar = deMiPerfil
  ? usuarioActual.fotoPerfil
  : { uri: publicacion.imagenPerfil };

  return (
    
    <ScrollView style={estilos.contenedor}>
      {/* imagen ampliada de la publicación */}
       <View style={estilos.usuarioDetalle}>
          <Image
            source={fuenteAvatar}
            style={estilos.avatarDetalle}
          />

          <View>
            <Text style={estilos.nombreUsuarioDetalle}>
              {nombreAMostrar}{" "}
              <Text style={estilos.idUsuarioDetalle}>· {publicacion.idUsuario}</Text>
            </Text>
            <Text style={estilos.ubicacionDetalle}>{publicacion.ubicacion}</Text>
          </View>
        </View>
      <Image
        source={{ uri: publicacion.imagenPublicacion }}
        style={estilos.imagenDetalle}
      />

      <View style={estilos.informacionDetalle}>
        {/* cabecera con usuario, id y ubicación simulada */}
       

        {/* iconos de interacción, incluyendo el corazón que da/quita el like */}
        <View style={estilos.accionesDetalle}>
          <View style={estilos.accionesIzquierda}>
            <TouchableOpacity
              style={estilos.botonAccion}
              onPress={() => alternarLike(publicacion.id)}
            >
              <Ionicons
                name={publicacion.tieneLike ? "heart" : "heart-outline"}
                size={28}
                color={publicacion.tieneLike ? "#ed4956" : "#262626"}
              />
            </TouchableOpacity>

            <TouchableOpacity style={estilos.botonAccion}>
              <Ionicons name="chatbubble-outline" size={26} color="#262626" />
            </TouchableOpacity>

            <TouchableOpacity style={estilos.botonAccion}>
              <Ionicons name="paper-plane-outline" size={26} color="#262626" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={26} color="#262626" />
          </TouchableOpacity>
        </View>

        {/* cantidad de likes, actualizada en tiempo real */}
        <Text style={estilos.likesDetalle}>
          {publicacion.cantidadLikes} Me gusta
        </Text>

        {/* descripción y fecha */}
        <Text style={estilos.descripcionDetalle}>
          <Text style={estilos.negrita}>{nombreAMostrar}</Text>{" "}
          {publicacion.descripcion}
        </Text>
        <Text style={estilos.fechaDetalle}>{publicacion.fecha}</Text>

        {/* lista de comentarios de la publicación */}
        <View style={estilos.comentariosDetalle}>
          {publicacion.comentarios.map((comentario, indice) => (
            <Text key={indice} style={estilos.comentario}>
              💬 {comentario}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  imagenDetalle: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#efefef",
  },
  informacionDetalle: {
    padding: 14,
  },
 usuarioDetalle: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
  paddingHorizontal: 14,
  paddingTop: 10,
},
  avatarDetalle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  nombreUsuarioDetalle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#262626",
  },
  idUsuarioDetalle: {
    fontWeight: "400",
    fontSize: 12,
    color: "#8e8e8e",
  },
  ubicacionDetalle: {
    fontSize: 11,
    color: "#8e8e8e",
    marginTop: 1,
  },
  accionesDetalle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  accionesIzquierda: {
    flexDirection: "row",
    alignItems: "center",
  },
  botonAccion: {
    marginRight: 14,
  },
  likesDetalle: {
    fontWeight: "600",
    fontSize: 13,
    color: "#262626",
    marginBottom: 6,
  },
  descripcionDetalle: {
    fontSize: 13,
    color: "#262626",
    marginBottom: 4,
  },
  negrita: {
    fontWeight: "600",
  },
  fechaDetalle: {
    fontSize: 11,
    color: "#8e8e8e",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  comentariosDetalle: {
    borderTopWidth: 1,
    borderTopColor: "#efefef",
    paddingTop: 10,
  },
  comentario: {
    fontSize: 13,
    color: "#262626",
    marginBottom: 8,
  },
});

export default PantallaDetallePublicacion;
