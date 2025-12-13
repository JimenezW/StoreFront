# StoreFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Diseño Responsivo con Tailwind CSS

Este proyecto utiliza [Tailwind CSS](https://tailwindcss.com/) para facilitar el diseño responsivo. Tailwind es un framework de CSS "utility-first" que te permite construir diseños modernos directamente en tu HTML.

### Enfoque "Mobile-First"

Los estilos están diseñados con un enfoque **"mobile-first"**. Esto significa que los estilos base son para dispositivos móviles, y puedes añadir modificadores para pantallas más grandes.

### Puntos de Ruptura (Breakpoints)

Tailwind CSS utiliza los siguientes puntos de ruptura por defecto:

-   `sm`: 640px
-   `md`: 768px
-   `lg`: 1024px
-   `xl`: 1280px
-   `2xl`: 1536px

### Cómo se Usa

Para que tus componentes sean responsivos, añade el prefijo del punto de ruptura a las clases de utilidad. Por ejemplo, para crear una parrilla de dos columnas en pantallas medianas y una sola columna en móviles, puedes hacer lo siguiente:

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div><!-- Columna 1 --></div>
  <div><!-- Columna 2 --></div>
</div>
```

En este ejemplo:

-   `grid-cols-1` establece un diseño de una sola columna por defecto (para móviles).
-   `md:grid-cols-2` cambia a un diseño de dos columnas en pantallas de 768px o más de ancho.

También puedes ocultar elementos en ciertos tamaños de pantalla. Por ejemplo, para ocultar un elemento en pantallas móviles:

```html
<div class="hidden md:block">
  <!-- Este elemento estará oculto en móviles y visible a partir de pantallas medianas -->
</div>
```
