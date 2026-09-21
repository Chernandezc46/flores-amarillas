# Flores Amarillas

Experiencia interactiva hecha con React y Vite: incluye una carta animada, galería de fotos, campo de girasoles, música de fondo y navegación por etapas.

## Requisitos

- Node.js 20 o superior
- npm

## Instalación

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Scripts

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción.
- `npm run preview`: sirve localmente el build generado.
- `npm run lint`: revisa el código con ESLint.

## Firebase opcional

La aplicación funciona sin Firebase y guarda los eventos localmente. Para activar el registro remoto, copia `.env.example` como `.env.local` y completa las variables con la configuración de tu proyecto Firebase.

No subas `.env.local` ni otras variables privadas al repositorio.

## Recursos locales

Las fotos de la galería están en `public/images` y la música en `public/audio`. Estos archivos forman parte de la experiencia y se sirven como recursos estáticos.
