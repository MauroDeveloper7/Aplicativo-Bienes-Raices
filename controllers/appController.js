import { Precio, Categoria, Propiedad } from '../models/index.js'
import { Sequelize } from 'sequelize'

const inicio = async (req, res) =>{
    const [categorias, precios, Casa, Departamento ] = await Promise.all([
        Categoria.findAll({raw : true}),
        Precio.findAll({raw: true}),
        Propiedad.findAll({
            limit:3,
            where:{
                categoriaId: 1
            },
            include:[
                {
                    model: Precio,
                    as: 'precio'
                }
            ],
            order:[
                ['createdAt', 'DESC']
            ]
        }),
        Propiedad.findAll({
			limit: 3,
			where: {
				categoriaId: 2,
			},
			include: [
				{
					model: Precio,
					as: "precio",
				},
			],
			order: [["createdAt", "DESC"]],
		}),
    ])
		res.render('inicio',{
			title:'Inicio',
			categorias,
			precios,
			Casa,
			Departamento,
			csrfToken: req.csrfToken()
    })
}

const categoria = async (req, res) => {
	const { id } = req.params;

	//comprobar que la categoria existe
	const categoria = await Categoria.findByPk(id);

	if (!categoria) {
		res.sendStatus(404).redirect("/404");
	}

	//filtrar las propiedades por categoria
	const propiedades = await Propiedad.findAll({
		where: {
			categoriaId: id,
		},
		include: [
			{
				model: Precio,
				as: "precio",
			},
		],
	});

	//si el nombre termina en s, se le quita la s
	let nombreCategoria = categoria?.nombre;
	if (nombreCategoria.endsWith("s")) {
		nombreCategoria = nombreCategoria.slice(0, -1);
	}

	res.render("categoria", {
		pagina: `Categoría: ${nombreCategoria}s`,
		propiedades,
		categoria,
        csrfToken: req.csrfToken()
	});
};

const noEncontrado = (req,res) =>{
    res.render('404',{
        title:'404',
        csrfToken: req.csrfToken()
    })
}

const buscador = async (req, res) => {

	const { termino } = req.body;

	
	if (!termino.trim()) {
		return res.redirect('/404');
	}

	
	const propiedades = await Propiedad.findAll({
		where: {
			titulo: {
				[Sequelize.Op.like]: '%' + termino + '%',
			},
		},
		include: [
			{
				model: Precio,
				as: "precio",
			},
			{
				model: Categoria,
				as: "categoria",
			},
		],
	});

	res.render('busqueda', {
		pagina: `Resultados de la búsqueda: ${termino}`,
		propiedades,
        csrfToken: req.csrfToken()
	});
};

export{
    inicio,
    categoria,
    noEncontrado,
    buscador
}