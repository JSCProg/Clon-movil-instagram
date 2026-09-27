import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import StackPrincipal from "./src/navegacion/StackPrincipal";
import { PublicacionesProvider } from "./src/contextos/PublicacionesContext";

// Componente raíz de la aplicación
export default function App() {
  return (
    <SafeAreaProvider>
      {/* StatusBar personalizada: iconos oscuros sobre fondo claro */}
      <StatusBar style="dark" backgroundColor="#ffffff" />

      {/* Provider que comparte las publicaciones y el estado de like
          entre el Feed, el Detalle y el Perfil */}
      <PublicacionesProvider>
        {/* Contenedor de navegación que envuelve el stack principal */}
        <NavigationContainer>
          <StackPrincipal />
        </NavigationContainer>
      </PublicacionesProvider>
    </SafeAreaProvider>
  );
}
