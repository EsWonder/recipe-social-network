# Usar una imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto en el que se ejecutará el microservicio
EXPOSE 3000

# Comando para iniciar el microservicio
CMD ["node", "index.js"]
