import path from 'path'  // Define una ruta absoluta

export default {
    mode: 'development',
    entry: {
        mapa: './src/js/mapa.js',
        agregarImagen: './src/js/agregarImagen.js',
        mostrarMapa: './src/js/mostrarMapa.js',
    },
    output: {
        filename: '[name].js',
        // Independiente del host el escribe carpeta (js) la ruta absoluta
        path: path.resolve('public/js')
    },
}