# Parcial2-DL
Segundo parcial, Daniel Alejandro Leonardo Ericastilla-9989-23-12487-sección 3

Backend
Para ejecutar el backend, ejecutamos los siguientes comandos
mvn clean
mvn instal 
mvn sprin
mvn spring-boot:run -e

Es muy importante ya tener nuestro archivo de springboot con maven, las dependencias necesarias para este proyecto, muy importante para la base de datos temporal H2 descargado, nuestro controller, nuestro modelo, nuestro repository, etc.
Así como tener configurado de manera adecuada nuestro application.properties.

Frontend:

Para nuestro frontend ejecutamos los siguientes comandos creando una nueva carpeta, ingresando a la consola:
npm create vite@latest frontend_inventario --template react
Vamosa seleccionar react
luego javascript
posteriormente cd .\frontend_inventario\
npm install axios

Actualizamos nuestros archivos App.css y App.jsx con todo el código que vamos a desplegar
MUY IMPORTANTE: cambiar el puerto del vite.config.js a http://localhost:8080
Luego ya compilamos con npm run dev      
Ahora ya podemos ingresar al link http://localhost:5173/ para poder observar nuestro frontend y si es necesarko, hacer actualizaciones en los archivos.

