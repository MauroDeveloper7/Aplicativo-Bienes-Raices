import express from 'express';
import { body } from 'express-validator';
import { admin, crear, guardar, agregaImagen, almacenarImagen,guardarCambios,editar, eliminar } from '../controllers/propiedadController.js'
import protegerRuta from '../milddleware/protegerRuta.js';
import upload from '../milddleware/subirImagen.js';


const router = express.Router();

router.get('/mispropiedades',protegerRuta, admin)
router.get('/propiedades/crear', crear)

router.post('/propiedades/crear',
    protegerRuta,
    body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio'),
    body('descripcion').notEmpty().withMessage('La Descripción no puede ir vacia').isLength({ max: 200 }).withMessage('La Descripción es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoría'),
    body('precio').isNumeric().withMessage('Selecciona un rango de Precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona la Cantidad de Habitaciones'), 
    body('estacionamiento').isNumeric().withMessage('Selecciona la Cantidad de Estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona la Cantidad de Baños'),
    body('lat').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
    guardar
);


router.get('/propiedades/agregarImagen/:id', protegerRuta, agregaImagen);

router.post('/propiedades/agregarImagen/:id', protegerRuta, upload.single('imagen'), almacenarImagen);

router.get('/propiedades/editar/:id',
    protegerRuta,
    editar
)
router.get('/propiedades/editar/:id',
    protegerRuta,
    body('titulo').notEmpty().withMessage('El titulo del anuncio es obligatorio'),
    body('descripcion').notEmpty().withMessage('La Descripción no puede ir vacia').isLength({ max: 200 }).withMessage('La Descripción es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoría'),
    body('precio').isNumeric().withMessage('Selecciona un rango de Precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona la Cantidad de Habitaciones'), 
    body('estacionamiento').isNumeric().withMessage('Selecciona la Cantidad de Estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona la Cantidad de Baños'),
    body('lat').notEmpty().withMessage('Ubica la Propiedad en el Mapa'),
    guardarCambios
)

router.post('/propiedades/eliminar/:id',
    protegerRuta,
    eliminar
)




export default router;