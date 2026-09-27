import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

// Componente simple que se muestra mientras las publicaciones
// todavia no fueron obtenidas desde la API
function Cargando() {
  return (
    <View style={estilos.contenedorCargando}>
      <ActivityIndicator size="large" color="#833AB4" />
      <Text style={estilos.textoCargando}>Cargando publicaciones...</Text>
    </View>
  );
}

// Todos los estilos visuales se definen exclusivamente con StyleSheet.create()
const estilos = StyleSheet.create({
  contenedorCargando: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  textoCargando: {
    marginTop: 12,
    fontSize: 14,
    color: "#8e8e8e",
  },
});

export default Cargando;
