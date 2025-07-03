# Microservicio: Eliminar Receta

Este microservicio permite eliminar recetas en la red social de recetas.

## Endpoints

### DELETE `/delete-recipe/:id`
Elimina una receta por su ID.

**Parámetros de la solicitud**:
- `id` (requerido): El ID de la receta a eliminar.

**Respuesta exitosa (200)**:
```json
{
  "message": "Receta eliminada con éxito"
}
```

**Respuesta de error (404)**:
```json
{
  "message": "Receta no encontrada"
}
```

## Instalación

1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Ejecutar `node index.js` para iniciar el servidor.
4. Alternativamente, puedes usar Docker: `docker build -t delete-recipe . && docker run -p 3000:3000 delete-recipe`

## Requerimientos

- Node.js 14+
- MongoDB (asegúrate de tener MongoDB corriendo localmente o usar una base de datos en la nube)
