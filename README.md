# Node.js + MongoDB | Trabajo Práctico UNTREF

¡Hola! Este repositorio contiene mi trabajo práctico de Backend de UNTREF, en el que fui aprendiendo a trabajar con Node.js, Express y MongoDB.

El objetivo fue crear un servidor que se conecte a una base de datos y permita consultar, agregar, modificar y eliminar información.

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución de JavaScript.
- **Express:** para crear el servidor y gestionar las rutas.
- **MongoDB Atlas:** base de datos NoSQL en la nube.
- **MongoDB Node.js Driver:** para conectar Node.js con MongoDB.
- **Dotenv:** para gestionar las variables de entorno.
- **Postman:** para probar los endpoints de la API.

## ¿Qué desarrollé?

Creé una API REST para gestionar una colección de frutas almacenada en MongoDB.

Los endpoints implementados son:

| Método | Ruta | Funcionalidad |
|---|---|---|
| GET | `/frutas` | Obtener todas las frutas |
| GET | `/frutas/:id` | Buscar una fruta por ID |
| GET | `/frutas/nombre/:nombre` | Buscar frutas por nombre |
| GET | `/frutas/importe/:precio` | Buscar frutas por importe |
| POST | `/frutas` | Agregar una fruta |
| PUT | `/frutas/:id` | Actualizar una fruta |
| DELETE | `/frutas/:id` | Eliminar una fruta |

## ¿Qué aprendí durante este trabajo?

Este trabajo me permitió entender mejor cómo funciona el desarrollo Backend y cómo se conectan diferentes tecnologías para construir una API.

Entre los principales aprendizajes destaco:

- Crear un servidor utilizando Node.js y Express.
- Configurar una conexión con MongoDB Atlas.
- Crear y consultar bases de datos y colecciones.
- Realizar consultas y filtros en MongoDB.
- Implementar las operaciones CRUD: Create, Read, Update y Delete.
- Trabajar con rutas y parámetros en Express.
- Recibir y procesar información mediante JSON.
- Utilizar códigos de estado HTTP para responder a las solicitudes.
- Validar datos y manejar errores.
- Probar los endpoints utilizando Postman.
- Gestionar variables de entorno para proteger los datos de conexión.

También aprendí la importancia de organizar el código en diferentes archivos y de cerrar correctamente las conexiones a la base de datos.

## Estructura del proyecto

```text
NodeJS-MongoDB/
├── src/
│   └── mongodb.js
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## Instalación y ejecución

Clonar el repositorio:

```bash
git clone https://github.com/zzlabs-community/nodejs-mongodb-frutas.git
```

Ingresar a la carpeta:

```bash
cd nodejs-mongodb-frutas
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto y configurar la conexión:

```env
MONGODB_URI=tu_uri_de_mongodb
```

Iniciar el servidor:

```bash
node index.js
```

El servidor estará disponible en:

`http://localhost:3000`

## Reflexión final

Este trabajo fue una buena oportunidad para llevar a la práctica los conceptos de Backend que fuimos viendo durante las clases.

Pude pasar de trabajar con consultas en MongoDB a conectarlas con una aplicación real mediante Node.js y Express, y finalmente construir y probar una API con operaciones CRUD.

Todavía hay mucho por aprender y mejorar, pero este proyecto me permitió comprender mejor cómo funciona una aplicación Backend y cómo interactúan el servidor y la base de datos.

---

**Trabajo práctico realizado para UNTREF.**

