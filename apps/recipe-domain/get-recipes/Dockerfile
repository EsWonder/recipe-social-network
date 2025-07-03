# Dockerfile para microservicios en Node.js
FROM node:16

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código del microservicio
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 5000

# Ejecutar el microservicio
CMD ["npm", "start"]
