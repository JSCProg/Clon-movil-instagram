import React from "react";
import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PantallaFeed from "../pantallas/PantallaFeed";
import PantallaDetallePublicacion from "../pantallas/PantallaDetallePublicacion";
import PantallaPerfil from "../pantallas/PantallaPerfil";
import { usuarioActual } from "../datos/usuario";

// Definición de los parámetros que recibe cada pantalla del stack
// Se pasa solo el "id" de la publicación (y no el objeto completo)
// para que el Detalle siempre lea el estado más actualizado
// desde el contexto compartido de publicaciones
export type ParametrosStack = {
  Feed: undefined;
  DetallePublicacion: { id: number; deMiPerfil?: boolean };
  Perfil: undefined;
};

// createNativeStackNavigator utiliza la barra de navegación
// NATIVA de cada plataforma (UINavigationController en iOS
// y Fragment con Toolbar nativo en Android)
const Stack = createNativeStackNavigator<ParametrosStack>();

// Componente de navegación principal de la aplicación
function StackPrincipal() {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        // estilo general de la barra de navegación nativa superior
        headerStyle: estilos.header,
        headerTitleStyle: estilos.tituloHeader,
        headerTintColor: "#262626",
        headerShadowVisible: true,
      }}
    >
      {/* Pantalla del feed principal */}
      <Stack.Screen
        name="Feed"
        component={PantallaFeed}
        options={({ navigation }) => ({
          title: "Instagram",
          headerTitleAlign: "left",
          // boton para acceder al prfil
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Perfil")}
              style={estilos.botonPerfil}
            >
              <Image
  source={usuarioActual.fotoPerfil}
  style={estilos.avatarHeader}
/>
            </TouchableOpacity>
          ),
        })}
      />

      {/* Pantalla de detalle de una publicación */}
      <Stack.Screen
        name="DetallePublicacion"
        component={PantallaDetallePublicacion}
        options={{
          title: "Publicación",
          headerTitleAlign: "center",
        }}
      />

      {/* Pantalla de perfil del usuario */}
      <Stack.Screen
        name="Perfil"
        component={PantallaPerfil}
        options={{
          title: "Perfil",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

const estilos = StyleSheet.create({
  header: {
    backgroundColor: "#ffffff",
  },
  tituloHeader: {
    fontWeight: "700",
    fontSize: 18,
    color: "#262626",
  },
  botonPerfil: {
    marginRight: 6,
  },
  avatarHeader: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default StackPrincipal;
