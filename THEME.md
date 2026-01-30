# Sistema de Temas - Tailwind CSS v4

Este documento describe el sistema de temas implementado en el proyecto.

## Estructura

```
src/
├── css/
│   └── theme.css          # Variables de tema con @theme
├── hooks/
│   └── useTheme.ts        # Hook para gestionar tema
└── components/
    └── ThemeSelector.tsx  # Componente toggle de tema
```

## Paleta de Colores

### Modo Oscuro (Default)

| Variable | Uso | Valor |
|----------|-----|-------|
| `brand` | Titulos, enlaces principales | cyan-400 |
| `brand-hover` | Hover de brand | cyan-300 |
| `accent` | Acentos secundarios | cyan-500 |
| `accent-hover` | Hover de accent | cyan-400 |
| `background` | Fondo principal | neutral-950 |
| `surface` | Cards, secciones | neutral-900 |
| `surface-hover` | Hover de surface | neutral-800 |
| `text-primary` | Texto principal | neutral-100 |
| `text-secondary` | Texto secundario | neutral-300 |
| `text-muted` | Texto apagado | neutral-400 |
| `text-placeholder` | Placeholders | neutral-500 |
| `border` | Bordes | neutral-700 |
| `border-subtle` | Bordes sutiles | neutral-800 |
| `success` | Exito | green-400 |
| `error` | Error | red-400 |
| `warning` | Advertencia | amber-400 |

### Modo Claro

| Variable | Valor |
|----------|-------|
| `brand` | neutral-900 |
| `brand-hover` | neutral-700 |
| `accent` | neutral-600 |
| `background` | white |
| `surface` | neutral-50 |
| `text-primary` | neutral-900 |
| `text-secondary` | neutral-600 |
| `border` | neutral-300 |

## Uso en Componentes

### Clases Tailwind Disponibles

```tsx
// Colores de texto
className="text-brand"          // Titulos, enlaces
className="text-accent"         // Acentos
className="text-text-primary"   // Texto principal
className="text-text-secondary" // Texto secundario
className="text-text-muted"     // Texto apagado

// Fondos
className="bg-background"       // Fondo de pagina
className="bg-surface"          // Cards
className="bg-surface/50"       // Cards con opacidad
className="bg-surface-hover"    // Hover states

// Bordes
className="border-border"       // Bordes normales
className="border-border-subtle" // Bordes sutiles
className="border-brand/30"     // Bordes con color brand

// Feedback
className="text-success"        // Mensajes de exito
className="text-error"          // Mensajes de error
className="text-warning"        // Advertencias
```

### Ejemplo de Card

```tsx
<div className="p-4 bg-surface/50 border border-border-subtle rounded-md">
  <h3 className="text-brand font-bold">Titulo</h3>
  <p className="text-text-secondary">Descripcion</p>
</div>
```

### Ejemplo de Input

```tsx
<input
  className="w-full px-4 py-3 bg-surface/50 border border-border rounded-md
             text-text-primary placeholder:text-text-placeholder
             focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
  placeholder="Escribe aqui..."
/>
```

## Hook useTheme

```tsx
import { useTheme } from "../hooks/useTheme";

function MyComponent() {
  const { theme, setTheme, toggleTheme, isDark, isLight } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDark ? "Cambiar a claro" : "Cambiar a oscuro"}
    </button>
  );
}
```

### API del Hook

| Propiedad | Tipo | Descripcion |
|-----------|------|-------------|
| `theme` | `"light" \| "dark"` | Tema actual |
| `setTheme` | `(theme) => void` | Establecer tema |
| `toggleTheme` | `() => void` | Alternar tema |
| `isDark` | `boolean` | Es tema oscuro |
| `isLight` | `boolean` | Es tema claro |

## Funcionamiento

1. El tema se guarda en `localStorage` con la clave `theme`
2. Por defecto se usa el tema oscuro
3. El atributo `data-theme` se aplica al elemento `<html>`
4. Las variables CSS cambian automaticamente segun el tema

## Agregar Nuevos Colores

1. Agregar variable en `:root` (tema oscuro) en `theme.css`
2. Agregar variable en `[data-theme="light"]` (tema claro)
3. Registrar en el bloque `@theme` para que Tailwind lo reconozca

```css
/* theme.css */
:root {
  --theme-nuevo-color: var(--color-blue-400);
}

[data-theme="light"] {
  --theme-nuevo-color: var(--color-blue-600);
}

@theme {
  --color-nuevo-color: var(--theme-nuevo-color);
}
```

Luego usar como `text-nuevo-color` o `bg-nuevo-color` en componentes.
