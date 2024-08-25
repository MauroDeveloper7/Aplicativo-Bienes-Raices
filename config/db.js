import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();  // Cargar variables del archivo .env

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
        timestamps: true,
    },
    pool: {
        max: 5, // Número máximo de conexiones en el pool
        min: 0, // Número mínimo de conexiones en el pool
        acquire: 30000, // Tiempo máximo en milisegundos que el pool intentará adquirir una conexión antes de lanzar un error
        idle: 10000, // Tiempo máximo en milisegundos que una conexión puede estar inactiva antes de ser liberada
    },
});

try {
    await db.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
} catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
}

export default db;