import React, { useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

// Componentes que forman el contenido principal del feed
import BarraHistorias from "../componentes/BarraHistorias";
import Publicacion from "../componentes/Publicacion";
import Cargando from "../componentes/Cargando";

// interface utilizada para tipar las publicaciones
import type { Publicacion as TipoPublicacion } from "../interfaces/publicacion";

// contexto compartido: trae las publicaciones ya cargadas (via axios + useEffect)
// y la función para dar/quitar like, la misma que usan el Detalle y el Perfil
import { usarPublicaciones } from "../contextos/PublicacionesContext";

// tipos de navegacion definidos en el stack principal
import type { ParametrosStack } from "../navegacion/StackPrincipal";

type PropsPantallaFeed = NativeStackScreenProps<ParametrosStack, "Feed">;

// Pantalla principal de la aplicación: muestra el feed de publicaciones
function PantallaFeed({ navigation }: PropsPantallaFeed) {
  // publicaciones, estado de carga y función de like, provistos por el contexto
  const { publicaciones, cargando, alternarLike } = usarPublicaciones();

  // funcion que navega hacia el detalle de la publicación seleccionada
  // (se pasa solo el id, el detalle busca los datos actuales en el contexto)
  const irADetalle = useCallback(
    (id: number) => {
      navigation.navigate("DetallePublicacion", { id });
    },
    [navigation]
  );

  // funcion que renderiza cada elemento del FlatList
  // se memoriza con useCallback para optimizar el rendimiento
  const renderizarPublicacion = useCallback(
    ({ item }: { item: TipoPublicacion }) => (
      <Publicacion
        idUsuario={item.idUsuario}
        nombreUsuario={item.nombreUsuario}
        ubicacion={item.ubicacion}
        imagenPerfil={item.imagenPerfil}
        imagenPublicacion={item.imagenPublicacion}
        descripcion={item.descripcion}
        cantidadLikes={item.cantidadLikes}
        fecha={item.fecha}
        tieneLike={item.tieneLike}
        alAlternarLike={() => alternarLike(item.id)}
        alSeleccionar={() => irADetalle(item.id)}
      />
    ),
    [irADetalle, alternarLike]
  );

  // el encabezado de la lista muestra la barra de historias
  // y solo se renderiza una vez, arriba de todo el feed
  const encabezadoLista = useCallback(() => <BarraHistorias />, []);

  // mientras las publicaciones se cargan se muestra el indicador de carga
  if (cargando) {
    return (
      <View style={estilos.contenedor}>
        <Cargando />
      </View>
    );
  }

  return (
    <View style={estilos.contenedor}>
      {/* Feed estructurado exclusivamente mediante FlatList,
          con configuraciones de rendimiento optimizado */}
      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderizarPublicacion}
        ListHeaderComponent={encabezadoLista}
        showsVerticalScrollIndicator={false}
        // --- optimizaciones de rendimiento del FlatList ---
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
});

export default PantallaFeed;
