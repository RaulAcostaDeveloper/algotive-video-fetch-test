# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Documentación del proyecto algotive
Se crea el proyecto con la versión de react 18.2.0 y con la versión de typescript 4.9.5
Con el siguiente comando
npx créate-react-app algotive-video-fetch-test –template typescript
### Access-Control-Allow-Origin
Es necesario instalar la extensión del navegador Access-Control-Allow-Origin
Con el objetivo de poder acceder a la API
### Respecto a sass
Se usó sass como compilador de css en su versión 1.71.1
Npm install sass
Se agrega el script en package.json
En “scripts”:{}
    "build:css": "sass ./src/input.scss ./src/output.css"
Todos los archivos se importan a input.scss
Para compilar es el siguiente comando
Npm run build:css
### Librerías externas
Se usaron dos librerías para el gráfico
npm install chart.js react-chartjs-2
### Estilos
Los colores son los que encontré de la compañía
$AlgotiveGoldColor : rgb(247, 167, 0);
$AlgotiveBlueColor: rgb(2,49,103);
$AlgotiveWhiteColor: white;
Algo del Código lo tomé de mi portafolio (el menú lateral)
### Análisis de rendimiento
Se realizó un análisis de rendimiento rápido y arrojó algunos resultados
En resumen, se resolvieron algunos detalles mínimos.
Los warning restantes eran problemas relacionados a js/bundle.js
Para acceder a la API
Para acceder a la API se instaló Docker Desktop
Se corrió el comando en cmd
docker run -p 8000:8000 public.ecr.aws/z1m5q8w6/algotive-challenge/backend-repo:1.0.0
Se entró a la bios para activar la virtualización (SVM Mode para micro procesador AMD)
