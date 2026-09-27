# Instagram Clon — React Native + Expo

Migración del proyecto web original (React + Vite) a **React Native bajo el ecosistema Expo**.

## Instalación

```bash
npm install
npx expo start
```

Desde la terminal de Expo se puede abrir en Android, iOS o web (presionando `a`, `i` o `w`), o escaneando el código QR con la app **Expo Go**.

## Estructura del proyecto

```
App.tsx                              → punto de entrada, navegación y StatusBar
app.json                             → configuración de splash, icono y statusbar nativos
assets/                              → icono, splash y favicon personalizados
src/
  interfaces/                        → tipos TypeScript (Publicacion, Usuario)
  servicios/apigatos.ts              → llamada a la API con Axios (The Cat API)
  datos/usuario.ts                   → datos simulados del usuario y sugerencias
  navegacion/StackPrincipal.tsx      → Stack Navigator con barra nativa superior
  pantallas/
    PantallaFeed.tsx                 → feed con FlatList optimizado
    PantallaDetallePublicacion.tsx   → detalle de una publicación
    PantallaPerfil.tsx               → perfil con mosaico de 3 columnas
  componentes/
    BarraHistorias.tsx
    Publicacion.tsx
    Cargando.tsx
```

## Cumplimiento de requisitos

- **Barra de navegación nativa superior**: `@react-navigation/native-stack`, que usa el header nativo de cada plataforma (`StackPrincipal.tsx`).
- **Feed dinámico con FlatList optimizado**: `PantallaFeed.tsx` usa `FlatList` con `initialNumToRender`, `maxToRenderPerBatch`, `windowSize` y `removeClippedSubviews`.
- **Mapeo de 10+ imágenes vía Axios**: `apigatos.ts` consulta `https://api.thecatapi.com/v1/images/search?limit=10`.
- **StyleSheet.create() exclusivo**: todos los componentes y pantallas definen sus estilos con `StyleSheet.create()`, sin estilos en línea.
- **Interacciones táctiles**: `TouchableOpacity` en todos los botones e íconos interactivos.
- **Flujo de navegación**: Feed → Detalle de publicación → Perfil, totalmente funcional con React Navigation.
- **Cuadrícula 3 columnas en el perfil**: `PantallaPerfil.tsx` usa `FlatList` con `numColumns={3}`.
- **Personalización de assets nativos**: icono, `adaptive-icon`, splash screen y `StatusBar` personalizados en `app.json` y `App.tsx`.
