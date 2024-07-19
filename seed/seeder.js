import { exit } from 'node:process'
import categorias from './categorias.js'
import precios from './precios.js';
import usuarios from './usuarios.js';
import {Categoria, Precio, Usuario} from '../models/index.js';
import db from '../config/db.js';



const importarDatos = async () => {
    try {
       // Autenticar en la BD
        await db.authenticate();

        // Generar las columnas de la base de datos antes de insertar los datos
        await db.sync();

        // Insertamos los datos con "bulkCreate("
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios),
        ]);

        console.log('Datos Importados Correctamente')
        exit(0); // Exit(0), indica que sale sin errores
    } catch (error) {
        console.log(error);
        exit(1); // Exit(1), indica que hubo algún error
    }
};

const eliminarDatos = async () => {
    try {
        await db.sync({ force: true }); // Hacer un Truncate sobre las tablas
        console.log('Datos Eliminados Correctamente')
        exit();
        // await Promise.all([
        // 	Categoria.destroy({ truncate: true }),
        // 	Precio.destroy({ truncate: true }),
        // ]);
    } catch (error) {
        console.log(error);
        exit(1);
    }
};

if (process.argv[2] === "-i") {
    importarDatos();
}

if (process.argv[2] === "-e") {
    eliminarDatos();
}
