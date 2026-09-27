import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Interface que define las props que debe recibir el componente
interface PropsPublicacion {
  idUsuario: string;
  nombreUsuario: string;
  ubicacion: string;
  imagenPerfil: string;
  imagenPublicacion: string;
  descripcion: string;
  cantidadLikes: number;
  fecha: string;
  // indica si esta publicación ya tiene like (viene del contexto compartido)
  tieneLike: boolean;
  // se ejecuta al tocar el corazón, para dar o quitar el like
  alAlternarLike: () => void;
  // se ejecuta cuando el usuario toca la publicación para ver el detalle
  alSeleccionar: () => void;
}

// Componente que representa una publicación dentro del FlatList del feed.
// El estado del like NO se maneja acá adentro: se recibe por props desde
// el contexto compartido, para que quede sincronizado con la pantalla de Detalle.
function Publicacion({
  idUsuario,
  nombreUsuario,
  ubicacion,
  imagenPerfil,
  imagenPublicacion,
  descripcion,
  cantidadLikes,
  fecha,
  tieneLike,
  alAlternarLike,
  alSeleccionar,
}: PropsPublicacion) {
  return (
    // Tocar la publicación abre la pantalla de detalle
    <TouchableOpacity
      style={estilos.publicacion}
      activeOpacity={0.95}
      onPress={alSeleccionar}
    >
      {/* cabecera de la publicación */}
      <View style={estilos.cabeceraPublicacion}>
        <View style={estilos.informacionUsuario}>
          {/* avatar del usuario */}
          <Image source={{ uri: imagenPerfil }} style={estilos.circuloPerfil} />

          {/* nombre de usuario, id de usuario y localización simulada */}
          <View style={estilos.textosUsuario}>
            <View style={estilos.filaNombreId}>
              <Text style={estilos.nombreUsuario}>{nombreUsuario}</Text>
              <Text style={estilos.idUsuario}> · {idUsuario}</Text>
            </View>
            <Text style={estilos.ubicacion}>{ubicacion}</Text>
          </View>
        </View>

        <TouchableOpacity style={estilos.botonOpciones}>
          <Ionicons name="ellipsis-horizontal" size={18} color="#262626" />
        </TouchableOpacity>
      </View>

      {/* imagen principal de la publicación (imagen asíncrona provista por la API) */}
      <Image source={{ uri: imagenPublicacion }} style={estilos.imagenPublicacion} />

      {/* botones de interacción, con iconos vectoriales estilo Instagram */}
      <View style={estilos.accionesPublicacion}>
        <View style={estilos.accionesIzquierda}>
          <TouchableOpacity onPress={alAlternarLike} style={estilos.botonAccion}>
            <Ionicons
              name={tieneLike ? "heart" : "heart-outline"}
              size={26}
              color={tieneLike ? "#ed4956" : "#262626"}
            />
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botonAccion} onPress={alSeleccionar}>
            <Ionicons name="chatbubble-outline" size={24} color="#262626" />
          </TouchableOpacity>

          <TouchableOpacity style={estilos.botonAccion}>
            <Ionicons name="paper-plane-outline" size={24} color="#262626" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="#262626" />
        </TouchableOpacity>
      </View>

      {/* información de la publicación */}
      <View style={estilos.contenidoPublicacion}>
        <Text style={estilos.cantidadLikes}>{cantidadLikes} Me gusta</Text>

        <Text style={estilos.descripcionPublicacion}>
          <Text style={estilos.negrita}>{nombreUsuario}</Text> {descripcion}
        </Text>

        <Text style={estilos.comentariosPublicacion}>Ver los comentarios</Text>

        <Text style={estilos.fechaPublicacion}>{fecha}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Todos los estilos visuales se definen exclusivamente con StyleSheet.create()
const estilos = StyleSheet.create({
  publicacion: {
    backgroundColor: "#ffffff",
    marginBottom: 8,
  },
  cabeceraPublicacion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  informacionUsuario: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  circuloPerfil: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 10,
  },
  textosUsuario: {
    flexDirection: "column",
    flexShrink: 1,
  },
  filaNombreId: {
    flexDirection: "row",
    alignItems: "center",
  },
  nombreUsuario: {
    fontWeight: "600",
    fontSize: 14,
    color: "#262626",
  },
  idUsuario: {
    fontSize: 12,
    color: "#8e8e8e",
  },
  ubicacion: {
    fontSize: 11,
    color: "#8e8e8e",
    marginTop: 1,
  },
  botonOpciones: {
    padding: 6,
  },
  imagenPublicacion: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#efefef",
  },
  accionesPublicacion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  accionesIzquierda: {
    flexDirection: "row",
    alignItems: "center",
  },
  botonAccion: {
    marginRight: 14,
  },
  contenidoPublicacion: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 10,
  },
  cantidadLikes: {
    fontWeight: "600",
    fontSize: 13,
    color: "#262626",
    marginBottom: 4,
  },
  descripcionPublicacion: {
    fontSize: 13,
    color: "#262626",
    marginBottom: 4,
  },
  negrita: {
    fontWeight: "600",
  },
  comentariosPublicacion: {
    fontSize: 13,
    color: "#8e8e8e",
    marginBottom: 4,
  },
  fechaPublicacion: {
    fontSize: 11,
    color: "#8e8e8e",
    textTransform: "uppercase",
  },
});

export default Publicacion;
