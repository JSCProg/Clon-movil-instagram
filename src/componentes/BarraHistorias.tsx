import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const historias = [
  { id: 1, nombreUsuario: "javier0222", imagen: require("../../assets/javier.jpg") },
  { id: 2, nombreUsuario: "raul.perez", imagen: require("../../assets/raul.jpg") },
  { id: 3, nombreUsuario: "el_ingeniero12", imagen: require("../../assets/ingeniero.jpg") },
  { id: 4, nombreUsuario: "aguanteboca", imagen: require("../../assets/boca.jpg") },
  { id: 5, nombreUsuario: "riber.26611", imagen: require("../../assets/riber.jpg") },
];

function BarraHistorias() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={estilos.barraHistorias}
      contentContainerStyle={estilos.contenidoBarra}
    >
      {historias.map((historia) => (
        <View key={historia.id} style={estilos.historia}>
          <View style={estilos.circuloHistoria}>
            <Image source={historia.imagen} style={estilos.imagenHistoria} />
          </View>
          <Text style={estilos.nombreHistoria} numberOfLines={1}>
            {historia.nombreUsuario}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  barraHistorias: {
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdb",
    backgroundColor: "#ffffff",
  },
  contenidoBarra: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  historia: {
    alignItems: "center",
    width: 76,
    marginHorizontal: 4,
  },
  circuloHistoria: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#fd1d1d",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  imagenHistoria: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  nombreHistoria: {
    fontSize: 11,
    color: "#262626",
    marginTop: 4,
  },
});

export default BarraHistorias;