import { unlink } from 'node:fs/promises';
import { validationResult } from "express-validator";
import {Precio, Categoria, Propiedad, Mensaje} from "../models/index.js";
import { esVendedor } from '../helpers/index.js';

const admin = async (req, res) => {

    const { pagina: paginaActual } = req.query
    const expresion = /^[1-9]$/
    if (!expresion.test(paginaActual)){
        return res.redirect('/mispropiedades?pagina=1')
    }

    try{
        const {id} = req.usuario;
        const limit = 10
        const offset = ((paginaActual * limit) - limit)



        const [propiedades, total] = await Promise.all([
            Propiedad.findAll({
                limit, 
                offset,
                where: {
                    usuarioId : id
                },
                include: [
                    { model: Categoria, as: 'categoria' },
                    { model: Precio, as: 'precio' },
                    {model: Mensaje, as: 'mensajes'},
                ],
            }),
        ])
        console.log(total);

        res.render('propiedades/admin', {
            title: 'Mis propiedades',
            propiedades,
            csrfToken:req.csrfToken(),
            paginas: Math.ceil(total/limit),
            paginaActual: Number(paginaActual),
            total,
            offset,
            limit

        })
    }catch(error){
        console.log(error)
    }
}

const crear = async (req,res)=>{
    const[categorias,precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])
    res.render('propiedades/crear',{
        title:'Crear Propiedad',
        csrfToken:req.csrfToken(),
        categorias,
        precios,
        datos: {}
    })
    console.log(req.body);
}

const guardar = async (req, res) =>{
    //Validación
    let resultado = validationResult(req)
    if(!resultado.isEmpty()){
        const[categorias,precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        res.render('propiedades/crear',{
            title:'Crear Propiedad',
            csrfToken:req.csrfToken(),
            categorias,
            precios,
            errores:resultado.array(),
            datos:req.body
        })
    }
    console.log(req.body)
    // Crear un registro, se extraen los datos del request.body, se renombra el precioid por precio

    const {titulo,descripcion,habitaciones,estacionamiento,wc,calle,lat,lng,precio:precioId,categoria:categoriaId} = req.body
    const {id: usuarioId}= req.usuario
    try{
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId,
            usuarioId,
            imagen:''
        })

        const {id} = propiedadGuardada

        res.redirect(`/propiedades/agregarImagen/${id}`)


    } catch(error){
        console.log(error)
    }
}

const agregaImagen = async (req, res) => {
    const { id } = req.params;
    const propiedad = await Propiedad.findByPk(id);

    if (!propiedad) {
        return res.redirect('/mispropiedades');
    }

    if (propiedad.publicado) {
        return res.redirect("/mispropiedades");
    }

    if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
        return res.redirect("/mispropiedades");
    }

    res.render('propiedades/agregarImagen', {
        title: `Agregar Imagen: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        propiedad
    });
}

const almacenarImagen = async (req, res) => {
    const { id } = req.params;
    const propiedad = await Propiedad.findByPk(id);

    if (!propiedad) {
        return res.redirect("/mispropiedades");
    }

    if (propiedad.publicado) {
        return res.redirect("/mispropiedades");
    }

    if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
        return res.redirect("/mispropiedades");
    }

    try {
        propiedad.imagen = req.file.filename;
        propiedad.publicado = 1;
        await propiedad.save();

        res.redirect("/mispropiedades");
    } catch (error) {
        console.log(error);
    }
}

const editar = async (req,res) =>{
    
    const { id } = req.params;

    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad){
        return res.redirect('/mispropiedades')
    }
    if(propiedad.usuarioId.toString()!== req.usuario.id.toString()){
        return res.redirect('/mispropiedades')
    }

    const[categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])
    res.render('propiedades/editar',{
        title:`Editar Propiedad: ${propiedad.titulo}`,
        csrfToken:req.csrfToken(),
        categorias,
        precios,
        datos:propiedad
    })
}

const guardarCambios = async (req, res) =>{
    console.log('Guardando los cambios')

    let resultado = validationResult(req)

    if(!resultado.isEmpty()){
        const[categorias,precios]=await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        return res.render('propiedades/editar',{
            title:'Editar Propiedad',
            csrfToken:req.csrfToken(),
            categorias,
            precios,
            errores:resultado.array(),
            datos:req.body

        })
    }
    const { id } = req.params;

    const propiedad = await Propiedad.findByPk(id);

    if(!propiedad){
        return res.redirect('/mispropiedades')
    }

    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mispropiedades')
    }

    const {titulo,descripcion,habitaciones,estacionamiento,wc,calle,lat,lng,precio:precioId,categoria:categoriaId} = req.body


    propiedad.set({
        titulo,
        descripcion,
        habitaciones,
        estacionamiento,
        wc,
        calle,
        lat,
        lng,
        precioId,
        categoriaId,
    })
    await propiedad.save();

    res.redirect('/mispropiedades')

}

const eliminar = async (req, res)=>{
    console.log('Eliminando Propiedad.')

    const { id } = req.params;
    const propiedad = await Propiedad.findByPk(id);
    if(!propiedad){
        return res.redirect('/mispropiedades')
    }
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mispropiedades')
    }
        await unlink(`public/uploads/${propiedad.imagen}`);
        console.log(`Se Elimino una imagen - ${propiedad.imagen}`)
    propiedad.destroy();
    res.redirect('/mispropiedades')
}

const mostrarPropiedad = async (req,res) => {
    // console.log('Mostrando Propiedad')
    // res.send('Mostrando Propiedad')

    const { id } = req.params;
    const propiedad = await Propiedad.findByPk(id,{
        include: [
            {model: Precio, as: 'precio'},
            {model: Categoria, as: 'categoria'},
        ],
    })
    if(!propiedad || !propiedad.publicado){
        return res.redirect('/404')
    }
    res.render('propiedades/mostrar',{
        propiedad,
        title: propiedad.titulo,
        csrfToken: req.csrfToken(),
        usuario: req.usuario,
        esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId)
    })
}

const enviarMensaje = async (req, res) => {

	const propiedad = await Propiedad.findByPk(req.params.id, {
		include: [
			{ model: Categoria, as: "categoria" },
			{ model: Precio, as: "precio" },
		],
	});

	if (!propiedad) {
		return res.sendStatus(404).redirect("/404");
	}

	//validar mensaje desde el cliente
	await check("mensaje")
		.notEmpty()
		.withMessage("Escribe un mensaje válido")
		.isLength({ max: 200, min: 10 })
		.run(req);

	let resultado = validationResult(req);

	if (!resultado.isEmpty()) {
		return res.render("propiedades/mostrar", {
			propiedad,
			pagina: propiedad.titulo,
            csrfToken: req.csrfToken(),
			usuario: req.usuario,
			esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId),
			errores: resultado.array(),
			enviado: true,
		});
	}
	//almacenar el mensaje
	const { mensaje } = req.body;
	const { id: propiedadId } = req.params;
	const { id: usuarioId } = req.usuario;
	try {
		await mensaje.create({
			mensaje,
			propiedadId,
			usuarioId,
		});
		res.redirect("/");
	} catch (error) {
		console.log(error);
	}
};

const verMensajes = async (req, res) => {
	const { id } = req.params;

	//validar que la propiedad exista
	const propiedad = await Propiedad.findByPk(id, {
		include: [
			{
				model: Mensaje,
				as: "mensajes",
				include: [{ model: Usuario.scope("eliminarPassword"), as: "usuario" }],
			},
		],
	});

	if (!propiedad) {
		return res.redirect("/mispropiedades");
	}

	//validar que la propiedad pertenezca al usuario
	if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
		return res.redirect("/mispropiedades");
	}

	res.render("propiedades/mensajes", {
		pagina: "Mensajes recibidos",
		mensajes: propiedad.mensajes,
		formatearFecha,
	});
};

const cambiarEstado = async (req, res) => {
    const { id } = req.params;
	const propiedad = await Propiedad.findByPk(id);

	if (!propiedad) {
		return res.redirect("/mispropiedades");
	}

	//propiedad pertenece al usuario
	if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
		return res.redirect("/mispropiedades");
	}

	//cambiar el estado de la propiedad
	propiedad.publicado = !propiedad.publicado;

	await propiedad.save();
	res.json({ resultado: 'Ok!' });
};

export {
    admin,
    crear,
    guardar,
    agregaImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar,
    mostrarPropiedad,
    enviarMensaje,
    verMensajes,
    cambiarEstado
}