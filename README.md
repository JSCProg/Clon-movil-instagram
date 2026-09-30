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
