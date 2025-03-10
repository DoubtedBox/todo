# Instrucciones para Usar la Página

Para usar esta página de manera correcta, necesitamos un servidor web simple con `npx serve`. Si no lo tienes, puedes instalarlo con:
`npm install -g serve`

Esto surge ya que, si se intenta ejecutar la página directamente, se obtiene un error de CORS al momento en que el `index.html` llama al `index.js`.

## Otros Detalles

Parece que los navegadores web no soportan CommonJS, así que cambiamos a ES en el `tsconfig.json`, como se puede ver a continuación:

```json
{
  "compilerOptions": {
    "module": "ES6"
  }
}
```
Igualmente, en el código TypeScript tuvimos que añadir la extensión .js a todos los módulos importados.
