const esVendedor = (usuarioId, propiedadUsuarioId) => {
	return usuarioId === propiedadUsuarioId;
};

const formatearFecha = (fecha) => {
	const nuevaFecha = new Date(fecha);
	const opciones = {
		weekday: 'long',
        year: 'numeric',
		month: "long",
		day: "numeric",
	};
	return new Date(nuevaFecha).toLocaleDateString('es-Es', opciones)
};

export {
	esVendedor,
	formatearFecha,
};