import React, { useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { usuarioActual, sugerencias } from "../datos/usuario";
import type { Publicacion } from "../interfaces/publicacion";
import type { ParametrosStack } from "../navegacion/StackPrincipal";

// contexto compartido: se reutilizan las mismas publicaciones del feed
// para armar el mosaico, así al abrir una se ve el mismo like/estado
import { usarPublicaciones } from "../contextos/PublicacionesContext";

// calcula el ancho de cada celda del mosaico para lograr
// una cuadrícula perfecta de 3 columnas
const ANCHO_PANTALLA = Dimensions.get("window").width;
const SEPARACION = 2;
const ANCHO_CELDA = (ANCHO_PANTALLA - SEPARACION * 2) / 3;

type PropsPantallaPerfil = NativeStackScreenProps<ParametrosStack, "Perfil">;

// Pantalla de perfil del usuario: datos personales, sugerencias
// y mosaico de publicaciones en cuadrícula de 3 columnas
function PantallaPerfil({ navigation }: PropsPantallaPerfil) {
  // se reutilizan las publicaciones ya cargadas por el contexto
  // (las mismas que se ven en el feed) para armar el mosaico del perfil
 const { publicacionesPerfil } = usarPublicaciones();

  // al tocar una celda del mosaico se abre el detalle de esa publicación,
  // marcando "deMiPerfil" para que el Detalle muestre al usuario del perfil
  // propio como autor, en vez del autor aleatorio original del feed
  const irADetalle = useCallback(
    (id: number) => {
      navigation.navigate("DetallePublicacion", { id, deMiPerfil: true });
    },
    [navigation]
  );

  // renderiza cada celda cuadrada del mosaico de publicaciones
  const renderizarCelda = useCallback(
    ({ item }: { item: Publicacion }) => (
      <TouchableOpacity
        style={estilos.celdaMosaico}
        activeOpacity={0.8}
        onPress={() => irADetalle(item.id)}
      >
        <Image source={{ uri: item.imagenPublicacion }} style={estilos.imagenCelda} />
      </TouchableOpacity>
    ),
    [irADetalle]
  );

  // encabezado del perfil: foto, biografía, estadísticas y sugerencias
  const encabezadoPerfil = useCallback(
    () => (
      <View>
        {/* datos principales del usuario */}
        <View style={estilos.usuarioActual}>
          <Image source={usuarioActual.fotoPerfil} style={estilos.fotoPerfil} />

          <View style={estilos.estadisticas}>
            <View style={estilos.estadisticaItem}>
              <Text style={estilos.numeroEstadistica}>
                {usuarioActual.publicaciones}
              </Text>
              <Text style={estilos.etiquetaEstadistica}>Publicaciones</Text>
            </View>

            <View style={estilos.estadisticaItem}>
              <Text style={estilos.numeroEstadistica}>
                {usuarioActual.seguidores}
              </Text>
              <Text style={estilos.etiquetaEstadistica}>Seguidores</Text>
            </View>

            <View style={estilos.estadisticaItem}>
              <Text style={estilos.numeroEstadistica}>
                {usuarioActual.seguidos}
              </Text>
              <Text style={estilos.etiquetaEstadistica}>Seguidos</Text>
            </View>
          </View>
        </View>

        <View style={estilos.datosUsuario}>
          <Text style={estilos.nombreUsuario}>{usuarioActual.nombreUsuario}</Text>
          <Text style={estilos.biografia}>{usuarioActual.biografia}</Text>
        </View>

        <TouchableOpacity style={estilos.botonEditar}>
          <Text style={estilos.textoBotonEditar}>Editar perfil</Text>
        </TouchableOpacity>

        {/* sugerencias de usuarios para seguir */}
        <View style={estilos.encabezadoSugerencias}>
          <Text style={estilos.tituloSugerencias}>Sugerencias para ti</Text>
          <TouchableOpacity>
            <Text style={estilos.verTodo}>Ver todo</Text>
          </TouchableOpacity>
        </View>

        {sugerencias.map((sugerencia) => (
          <View style={estilos.sugerencia} key={sugerencia.id}>
            <Image
              source={{ uri: `https://i.pravatar.cc/100?img=${sugerencia.id + 30}` }}
              style={estilos.avatarSugerencia}
            />

            <View style={estilos.datosSugerencia}>
              <Text style={estilos.usuarioSugerencia}>{sugerencia.usuario}</Text>
              <Text style={estilos.textoSugerencia}>{sugerencia.nombre}</Text>
            </View>

            <TouchableOpacity style={estilos.botonSeguir}>
              <Text style={estilos.textoBotonSeguir}>Seguir</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* separador entre las sugerencias y el mosaico de publicaciones */}
        <View style={estilos.separadorMosaico} />
      </View>
    ),
    []
  );

  return (
    <View style={estilos.contenedor}>
      {/* Mosaico de publicaciones estructurado con FlatList
          en una cuadrícula perfecta de 3 columnas (numColumns=3).
          Cada celda es tocable y abre el detalle de la publicación. */}
      <FlatList
        data={publicacionesPerfil}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderizarCelda}
        numColumns={3}
        ListHeaderComponent={encabezadoPerfil}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        initialNumToRender={9}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  usuarioActual: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  fotoPerfil: {
  width: 86,
  height: 86,
  borderRadius: 43,
  marginRight: 20,
  backgroundColor: "#e5e5e5",
  resizeMode: "cover",
},
  estadisticas: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  estadisticaItem: {
    alignItems: "center",
  },
  numeroEstadistica: {
    fontSize: 17,
    fontWeight: "700",
    color: "#262626",
  },
  etiquetaEstadistica: {
    fontSize: 12,
    color: "#262626",
    marginTop: 2,
  },
  datosUsuario: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  nombreUsuario: {
    fontWeight: "700",
    fontSize: 14,
    color: "#262626",
  },
  biografia: {
    fontSize: 13,
    color: "#262626",
    marginTop: 4,
  },
  botonEditar: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#dbdbdb",
    alignItems: "center",
  },
  textoBotonEditar: {
    fontWeight: "600",
    fontSize: 13,
    color: "#262626",
  },
  encabezadoSugerencias: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  tituloSugerencias: {
    fontWeight: "700",
    fontSize: 13,
    color: "#8e8e8e",
  },
  verTodo: {
    fontSize: 12,
    color: "#262626",
    fontWeight: "600",
  },
  sugerencia: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  avatarSugerencia: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  datosSugerencia: {
    flex: 1,
  },
  usuarioSugerencia: {
    fontWeight: "600",
    fontSize: 13,
    color: "#262626",
  },
  textoSugerencia: {
    fontSize: 12,
    color: "#8e8e8e",
    marginTop: 1,
  },
  botonSeguir: {
    paddingHorizontal: 10,
  },
  textoBotonSeguir: {
    color: "#0095f6",
    fontWeight: "600",
    fontSize: 13,
  },
  separadorMosaico: {
    borderTopWidth: 1,
    borderTopColor: "#dbdbdb",
    marginTop: 10,
  },

  // --- estilos del mosaico en cuadrícula de 3 columnas ---
  celdaMosaico: {
    width: ANCHO_CELDA,
    height: ANCHO_CELDA,
    marginRight: SEPARACION,
    marginBottom: SEPARACION,
    backgroundColor: "#efefef",
  },
  imagenCelda: {
    width: "100%",
    height: "100%",
  },
});

export default PantallaPerfil;
