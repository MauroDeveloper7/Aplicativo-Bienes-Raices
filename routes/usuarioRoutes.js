import express from 'express';
import { formularioLogin,autenticar,formularioRegistro,registrar,formularioOlvidePassword, confirmar,resetPassword,comprobarToken,nuevoPassword, Sesion } from '../controllers/usuarioController.js';

const router = express.Router();

// Formulario de Inicio de Sesión
router.get('/login',formularioLogin);
router.post('/login', autenticar);

// Finalizar sesión
router.post("/cerrar-sesion", Sesion);

// Formulario de Registro
router.get('/registro',formularioRegistro); 
router.post('/registro',registrar);

// Confirmación de cuenta
router.get('/confirmar/:token',confirmar);

// Formulario para recuperar contraseña
router.get('/olvide-password',formularioOlvidePassword);
router.post('/olvide-password', resetPassword);

// Almacenar nuevo contraseña y token
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token',nuevoPassword);

export default router;