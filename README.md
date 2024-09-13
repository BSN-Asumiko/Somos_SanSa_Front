# Somos SanSa 🍾

## Índice 📝

- [Descripción](#descripción-del-proyecto)
- [Instalación](#instalación)
  - [Requisitos Previos (Backend)](#requisitos-previos-backend)
  - [Requisitos Previos (Frontend)](#requisitos-previos-frontend)
  - [Instalación del proyecto (Backend)](#instalación-del-proyecto-backend)
  - [Instalación del proyecto (Frontend)](#instalación-del-proyecto-frontend)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribución](#contribución)
- [Developer](#developer)



## Descripción del Proyecto 📖

    Este proyecto es una aplicación web que permite a los usuarios conversar en un foro con diferentes secciones temáticas. Todos los usuarios pueden entrar a una sección, ver los temas y leer los comentarios. Solo los usuarios registrados pueden crear nuevos temas dentro de una sección seleccionada y escribir comentarios, así como editar su perfil. En las páginas de secciones y temas, se puede realizar búsquedas (por autor o título del tema dentro de una sección o por autor o contenido del comentario dentro de un tema).

    El proyecto está desarrollado con Java, Spring Boot, Spring Security y JWT para el back-end, utilizando una arquitectura MVC de 3 capas y estilo cliente-servidor (tipo API REST) con conexión a una base de datos en PostgreSQL. Para el front-end se utilizó React.js, Vite y TailwindCSS.



## Instalación 💾

### Requisitos Previos (Backend)
- **JDK 17 o superior**
- **Maven 3.9.8 o superior**
- **Spring Boot 3.3.3 o superior**
- **Base de datos PostgreSQL (o la que estés usando)**:
  - Crear una base de datos llamada `nombre_base_datos`
  - Actualizar las credenciales de conexión en el archivo `application.properties`
- **Configuración JWT**: Definir la clave secreta en el archivo `.env` o `application.properties`

### Requisitos Previos (Frontend)
- **Node.js v22.0.0 o superior**
- **npm 10.8.1 o superior**


### Instalación del proyecto (Backend)
1. Clona este repositorio:

```bash
git clone https://github.com/BSN-Asumiko/Somos_SanSa_Back.git
```

2. Configura las variables de entorno en el archivo .env 

    DB_URL=jdbc:postgresql://localhost:5432/nombre_base_datos
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña
    JWT_SECRET_KEY=tu_clave_secreta

3. Instala las dependencias de Maven

```bash
mvn clean install
```

4. Ejecuta la aplicación

```bash
mvn spring-boot:run
```


### Instalación del proyecto (Frontend)

1. Clona este repositorio: 
```bash
 git clone https://github.com/BSN-Asumiko/Somos_SanSa_Front.git
```

2. Configura las variables de entorno en el archivo .env

    VITE_CLOUD_NAME=tu_cloud_name
    VITE_UPLOAD_PRESET=tu_upload_preset

3. Instala las dependencias:

```bash
 npm install
```
4. Corre la aplicación

```bash
 npm run dev
```

## Tecnologías Utilizadas 🛠️

### Back-end:
- **Java 17**: lenguaje principal para la lógica de negocio.
- **Spring Boot 3.0.0**: para la creación del API RESTful.
- **Spring Security**: para la gestión de roles y permisos.
- **JWT (JSON Web Tokens)**: utilizado para la autenticación de usuarios.
- **PostgreSQL 13**: base de datos relacional.

### Front-end:
- **React.js 18.0.0**: biblioteca para la creación de interfaces de usuario.
- **JavaScript**: lenguaje utilizado en el frontend.
- **TailwindCSS**: para el diseño responsivo y estilización rápida.
- **HTML5** y **CSS3**: lenguajes fundamentales para el frontend.

### Otras Herramientas:
- **Maven**: gestión de dependencias y construcción del proyecto backend.
- **Vite**: para el empaquetado y entorno de desarrollo rápido del frontend.

### Servicios Externos:
- **Cloudinary**: servicio utilizado para la carga y gestión de imágenes (si aplica).



## Contribución 🤝

Haz un fork al repositorio.

Crea una nueva rama: `git checkout -b feature/name.`

Haz tus cambios.

Haz push de tu rama: `git push origin feature/name.`

Crea un pull request.

## Developer ✒️

Ekaterina Buinovskaia - https://github.com/BSN-Asumiko

