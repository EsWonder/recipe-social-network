# Microservicio: Crear Receta

Este microservicio permite crear nuevas recetas en la red social de recetas.

## Endpoints

### POST `/create-recipe`
Permite crear una nueva receta.

**Cuerpo de la solicitud**:
```json
{
  "title": "Nombre de la receta",
  "description": "Descripción de la receta",
  "imageUrl": "URL de la imagen (opcional)",
  "videoUrl": "URL del video (opcional)",
  "ingredients": ["Ingrediente 1", "Ingrediente 2"],
  "createdBy": "ID del usuario que crea la receta"
}
```

**Respuesta exitosa (201)**:
```json
{
  "message": "Receta creada con éxito",
  "recipe": {
    "title": "Nombre de la receta",
    "description": "Descripción",
    "ingredients": ["Ingrediente 1", "Ingrediente 2"],
    "createdBy": "ID del usuario"
  }
}
```

## Instalación

1. Clonar el repositorio.
2. Ejecutar `npm install` para instalar las dependencias.
3. Ejecutar `node index.js` para iniciar el servidor.
4. Alternativamente, puedes usar Docker: `docker build -t create-recipe . && docker run -p 3000:3000 create-recipe`

## Requerimientos

- Node.js 14+
- MongoDB (asegúrate de tener MongoDB corriendo localmente o usar una base de datos en la nube)
