import { validationResult } from "express-validator";
import {Precio, Categoria, Propiedad } from "../models/index.js";



const admin = async (req, res) => {
    
    const {id} = req.usuario;

    const propiedades = await Propiedad.findAll({
        where: {
            usuarioId : id
        },
        include: [
            { model: Categoria, as: 'categoria' },
            { model: Precio, as: 'precio' }
        ]
    })
    res.render('propiedades/admin', {
        pagina: 'Mis propiedades',
        propiedades,
        csrfToken:req.csrfToken
    })
}

// Formulario para crear una propiedad

const crear = async (req,res)=>{
    const[categorias,precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])
    res.render('propiedades/crear',{
        pagina:'Crear Propiedad',
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
            pagina:'Crear Propiedad',
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



const guardarimagen = async (req, res) =>{

    const { id } = req.params

    const propiedad = await Propiedad.findByPk(id)
    if(!propiedad){
        return res.redirect('/mispropiedades')
    }

    //validar que la propiedad no este publicada
	if (propiedad.publicado) {
		return res.redirect("/mispropiedades");
	}

	//propiedad pertenece al usuario
	if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
		return res.redirect("/mispropiedades");
	}

    res.render('propiedades/agregarImagen',{
        pagina: `Agregar Imagen:${propiedad.titulo}`,
        csrfToken:req.csrfToken,
        propiedad
    });
}


const almacenarImagen = async (req, res) => {
	//validar que la propiedad exista
    const { id } = req.params
	const propiedad = await Propiedad.findByPk(id);

	if (!propiedad) {
		return res.redirect("/mispropiedades");
	}

	//validar que la propiedad no este publicada
	if (propiedad.publicado) {
		return res.redirect("/mispropiedades");
	}

	//propiedad pertenece al usuario
	if (req.usuario.id.toString() !== propiedad.usuario.id.toString()) {
		return res.redirect("/mispropiedades");
	}

	try {
		//almacenar la imagen en el servidor y publicar la propiedad
		if (req.file) {
			propiedad.imagen = req.file.filename;
			propiedad.publicado = 1;
		}
		await propiedad.save();
		res.redirect("/mispropiedades");
	} catch (error) {
		console.log(error);
	}


};

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
        pagina:`Editar Propiedad: ${propiedad.titulo}`,
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
            pagina:'Editar Propiedad',
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

    if(propiedad.usuarioId.toString() !== req.usuario.id.tostring()){
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
    console.log('Eliminandoooooo.....')
}



export {
    admin,
    crear,
    guardar,
    guardarimagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar
}