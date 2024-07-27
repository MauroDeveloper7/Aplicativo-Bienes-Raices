import path from 'path'  // Define una ruta absoluta

export default {
    mode: 'development',
    entry: {
        mapa: './src/js/mapa.js',
        agregarImagen: './src/js/agregarImagen.js',
        mostrarMapa: './src/js/mostrarMapa.js',
        mapaInicio: './src/js/mapaInicio.js',
        cambiarEstado: './src/js/cambiarEstado.js',
    },
    output: {
        filename: '[name].js',
        // Independiente del host el escribe carpeta (js) la ruta absoluta
        path: path.resolve('public/js')
    },
}