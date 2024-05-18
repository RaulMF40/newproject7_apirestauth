# newproject7_apirestauth

PROYECTO Nº 7. BACKEND API REST AUTH DEL CURSO FULL STACK DEVELOPER - ROCK THE CODE.

HE CREADO LAS SIGUIENTES CARPETAS (aparte del index.js etc..)

src: 
- api:
  - controllers:
    - consoles.js
    - games.js
    - users.js
  - models:
    - consoles.js
    - games.js
    - users.js
  - routes:
    - consoles.js
    - games.js
    - users.js
 - middlewares:
  - auth.js
 - seeds: (NOTA**: aunque pedian que solo se subiera UNA. Al final he optador por subir TODAS LAS SEMILLAS A MONGODB, luego he añadido a traves de insomnia una juego/game, una consola/plataforma y un nuevo usuario)
    - console.seed.js 
    - game.seed.js.js
    - user.seed.js
 - utils:
    - db.js
    - jwt.js

//
nombrare los endpoints y breve descripción de lo que realiza cada uno.

- CARPETA CONTROLLERS - CONSOLES.JS

- post('/add', [isLogedIn], addConsole): Agrega una nueva consola después de iniciar sesión.
- get('/', getConsole): Muestra todas las consolas disponibles.
- put('/:id', [isLogedIn], editConsole): Permite editar los detalles de una consola específica, pero solo si has iniciado sesión.
- delete('/:id', [isLogedIn], deleteConsole): Elimina una consola en particular, siempre y cuando hayas iniciado sesión.
// 
//
- CARPETA CONTROLLERS - GAMES.JS

- post('/add', [isLogedIn], addGame): Permite añadir un nuevo juego. Requiere estar logueado.
- get('/', getGames): Obtiene la información de todos los juegos.
- put('/:id', [isLogedIn], editGame): Permite editar la información de un juego específico. Requiere estar logueado
- delete('/:id', [isLogedIn], deleteGame): Elimina un juego específico. Requiere estar logueado
//
//
- CARPETA CONTROLLERS - USERS.JS

- post('/register', register): Permite registrar un nuevo usuario.
- post('/login', login): Permite iniciar sesión/loguearse
- get('/', getUsers): Obtiene la información de todos los usuarios registrados
- put('/admin/:id', [isLogedIn], [isAdmin], manageAdmins): Permite gestionar los permisos de administrador de un usuario específico. Requiere estar logeuado como administrador.
- put('/:id', [isLogedIn], editUser): Permite editar la información de un usuario específico. Requiere estar logueado
- delete('/:id', isLogedIn, /*[isAdmin]*/, deleteUser): elimina un usuario autenticado por su ID, con una opción comentada para requerir privilegios de administrador. / en este endpoint correspondiente a su controlador, he realizado que tanto admin pueda eliminar cualquier usuario, y que un usuario se pueda eliminar a si mismo, pero que ningun usuario pueda eliminar a un admin. 
