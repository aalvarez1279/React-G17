# Tienda Tech

Tienda en línea hecha con React + TypeScript + Vite + Tailwind CSS. Proyecto del bloque de React (Tecsup, Módulo 8).

## Funcionalidades

- Catálogo de productos desde la API de [DummyJSON](https://dummyjson.com), con catálogo local de respaldo si la API falla.
- Filtro por categoría y búsqueda por nombre o marca.
- Detalle de producto por URL (`/producto/:id`) y página 404 propia.
- Carrito guardado en `localStorage` (se mantiene al recargar).
- Inicio de sesión con JWT (token Bearer) que expira a los 30 minutos.
- Checkout protegido: solo con sesión iniciada, con validación por campo.
- Páginas Detalle, Checkout y Login cargadas bajo demanda (`React.lazy`).

## Cómo ejecutarlo

```bash
npm install
cp .env.example .env     # en Windows: copy .env.example .env
npm run dev
```

Abre http://localhost:5173

Usuario de prueba de DummyJSON: `emilys` / `emilyspass`

## Variables de entorno

| Variable | Valor | Uso |
| --- | --- | --- |
| `VITE_API_URL` | `https://dummyjson.com` | URL base de la API de productos y login |

## Estructura

```
src/
  dominio/          Tipos y reglas del negocio (sin React)
  infraestructura/  API, login y localStorage
  aplicacion/       Context y hooks (useCart, useSesion, useProductos)
  ui/               Páginas, componentes y layout
```

## Scripts

- `npm run dev`: servidor de desarrollo
- `npm run build`: compila TypeScript y genera `dist/`
- `npm run lint`: revisa el código con oxlint

## Despliegue

Desplegado en Vercel. `vercel.json` redirige todas las rutas a `index.html` para que React Router funcione al recargar.
