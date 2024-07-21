import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import appRoutes from './routes/appRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import csrf from 'csurf';
import db from './config/db.js'
import cookieParser from 'cookie-parser';
console.log(csrf)

//Crear la app
const app =express()

//Habilitar lectura de datos en formularios
app.use(express.urlencoded({extended: true}))


//Conexión a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('Conexión correcta a la Base de Datos');
} catch (error) {
    console.log(error)
}

// Habilitación de las Vistas con PUG
app.set('view engine', 'pug')
app.set('views', './views')
// Carpeta Publica
app.use(express.static('public'))



//Routing
// app.use('/auth', usuarioRoutes)
//Habilita Cookie Parser
app.use(cookieParser())

//Habilitar CSRF

app.use( csrf({cookie:true}))

//Routing que se importa de usuarioRoutes
app.use('/auth', usuarioRoutes)
app.use('/', propiedadesRoutes)
app.use('/', appRoutes)
app.use('/api',apiRoutes)

//Definir un puerto y arrancar el proyecto
const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`El server esta corriendo desde el puerto: ${port}`)
});