import  jwt from 'jsonwebtoken';
import  { Usuario } from '../models/index.js';

const identificarUsuario = async (req, res, next) => {

	const token = req.cookies

	if (!token) {
		req.usuario = null;
		return next();
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const usuario = await Usuario.scope("eliminarPassword").findByPk(decoded.id);

		if (usuario) {
			req.usuario = usuario;
		}

		return next();
	} catch (error) {
		console.log(error);
		return res.clearCookie("_token").redirect("auth/login");
	}
};

export default identificarUsuario;