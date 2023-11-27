# Byte4bit Ecommerce

Byte4bit Ecommerce, es un ecommerce principalmente diseñado para ser intuitivo y facil de utilizar, con funcionalidad basicas como filtado, busquedas, creación, generación de pagos y consultas de las transacciones

la webapp esta enfocada para publicar productos asociados a tecnologias dado su paleta de colores y diseño sobrio


## Requerimientos

Este proyecto funciona con Node.js versión >= 18. Para validar la versión y verificar si tienes Node.js instalado, puedes utilizar el siguiente comando en tu consola preferida:

```
node -v
```

Si no tienes Node.js instalado o tu versión es inferior a 18, te recomiendo instalarlo haciendo clic aquí. [node](https://nodejs.org/)

Si prefieres usar Yarn como tu gestor de paquetes, puedes verificar si está instalado ejecutando el siguiente comando en tu consola preferida:

```
yarn -v
```

Si no lo tienes, puedes descargarlo aquí. [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

## Instalación

Este proyecto puede ser instalado utilizando npm o yarn.

En tu consola de comandos, puedes utilizar las siguientes líneas de código:

via npm
```bash
npm install
```
via yarn
```bash
yarn
```


## Variables de entorno

Para ejecutar este proyecto, debes crear un archivo .env.local en la carpeta raíz del proyecto y agregar las siguientes variables de entorno:

`AUTH0_SECRET`
`AUTH0_BASE_URL`
`AUTH0_ISSUER_BASE_URL`
`AUTH0_CLIENT_ID` 
`AUTH0_CLIENT_SECRET`

El proyecto tiene integrado la libreria para autenticacion de Auth0, por lo que es necesario definir las variables anteriores para que todo el sistema
de autenticación, funciones correctamente.

Por favor, solicita el valor de esta variable a la siguiente dirección de correo electrónico:  ramirogrisales@gmail.com

`NEXT_PUBLIC_MERCADOPADO_USER_INIT`

Esta variable es requerida para poder dar inicio al boton de pago en la implementacion de la pasarela de mercado pago

De igual manera, un correo electrónico con todos estos valores será enviado al evaluador del proyecto.



## Ejecutando el proyecto

Para iniciar el proyecto en modo de desarrollo, debes ejecutar el siguiente código en tu consola de comandos:

usando npm
```bash
npm run dev
```

usando yarn
```bash
yarn dev
```

El proyecto se iniciará en breve, y la consola proporcionará la dirección localhost y el puerto definidos por el framework.

<img width="365" alt="image" src="https://github.com/orimarselasirg/ecommerce-front/assets/84402210/a80546e1-3247-4d68-bf7d-c2ba3f803f71">

Haciendo clic en la dirección localhost proporcionada, se abrirá la pantalla inicial de la aplicación en tu navegador web predeterminado.

<img width="652" alt="image" src="https://github.com/orimarselasirg/ecommerce-front/assets/84402210/5dd2d350-813d-4d7d-ac49-6aad2e617ed7">


## Funcionalidades

- Creación de productos o servicios
- Navegación y paginado entre los productos creados
- Listar todas las compras tanto aprobadas como rechazadas por usuario
- panel lateral para ordenamientos, filtrados y busqueda de productos
- Autenticacion completa, login, logout, forgot password
- Pasarela de pago
- Notificaciones al correo de las transacciones realizadas
- Diseño sobrio, funcional y practico para una experiencia de usuario agradable


## GENERACION DE IMAGENES DOCKER Y EJECUCION

el proyecto tiene configurado el Dockerfile para generacion de la imagen y levantamiento del mismo

## Instalar docker

Debe tener instalado Docker, en caso dado que no, lo puede descargar en la pagina oficial. [Docker](https://docs.docker.com/desktop/install/windows-install/)

una vez instalado, debe crear una cuenta con un nombre de usuairo

## Ejecutar el build del docker

Abra una terminal y situese en la raiz del proyecto y ejecute el siguiente codigo para crear la imagen del proyecto: ``docker build -t [nombredelaimagen] .``

donde ``[nombredelaimagen]`` es el nombre que desea colocarle a la imagen

por convencion se recomienda ``nombreusuariodocker/nombredelproyecto``

por ejemplo:

```
docker build -t developer/ecommerce .
```

Importante, debe tener corriendo la aplicacion de Docker para que el comando no le genere errores

## Levantar la creación de la imagen

una vez generada la imagen, se debe ejecutar en la misma terminal y misma ubicacion el siguiente comando:

```
docker run -d -p 3000:3000 developer/ecommerce
```
este comando le generara una llave SHA que automaticamente levantara la imagen para su ejecucion

<img width="1244" alt="image" src="https://github.com/orimarselasirg/ecommerce-front/assets/84402210/b82465d2-4972-413f-a88a-c0ef1b11b304">

para poder usar la aplicacion front, debe dirigirse a las opciones de la imagen y ejecutar "open with browser"

<img width="1252" alt="image" src="https://github.com/orimarselasirg/ecommerce-front/assets/84402210/0e7b2dd8-a111-41f8-9947-0d5541f522c4">


En este punto ya tiene la aplicacion corriendo desde el contenedor

## Usos y ejemplos

Sistema funcional de autenticacion con Auth0

<img width="991" alt="image" src="https://github.com/orimarselasirg/ecommerce-front/assets/84402210/4697c1f5-8b16-4394-b975-5dd3b4ede6b5">

Home sobrio y funcional con accesos a rutas claves

<img width="1690" alt="image" src="https://github.com/orimarselasirg/ecommerce-front/assets/84402210/2d19db21-d71c-40a1-a84e-dbfebfff794e">

Creacion de productos

<img width="1427" alt="image" src="https://github.com/orimarselasirg/ecommerce-front/assets/84402210/061cfd10-91c0-43d3-9c73-e391955a7373">

Consultas de transacciones

<img width="1375" alt="image" src="https://github.com/orimarselasirg/ecommerce-front/assets/84402210/c644a95b-8205-4a3e-9476-deab0835631d">

Filtrados y busquedas

<img width="242" alt="image" src="https://github.com/orimarselasirg/ecommerce-front/assets/84402210/7ab8dab7-beec-4e49-a6e9-c9654614c17d">

Gestion de carrito de compras y boton de pago

<img width="1683" alt="image" src="https://github.com/orimarselasirg/ecommerce-front/assets/84402210/5ee0813d-107b-4b9a-a6e7-3cb4d5976329">


## Autor

- [@orimarselasirg](https://github.com/orimarselasirg)







