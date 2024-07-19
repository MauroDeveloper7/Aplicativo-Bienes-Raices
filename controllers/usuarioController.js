import Usuario from "../models/usuario.js";
import bcrypt from 'bcrypt'
import {check, validationResult} from 'express-validator'
import {generarJWT, generateId } from "../helpers/token.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js";

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        title:'Iniciar sesión',
        pagina: "Inicio de Sesión",
        csrfToken: req.csrfToken
    })
};

const autenticar = async (req, res) => {
    //console.log('autenticando....');
      /**validando */
    await check('email').isEmail().withMessage('ElEmail es obligatorio').run(req)
    await check('password').notEmpty().withMessage('El password es obligatorio').run(req)

    let resultado = validationResult(req)
    /*****validar el resultado no este vacio*****/
    if(!resultado.isEmpty()){
        //Errores
        return res.render('auth/login', {
            pagina: 'Iniciar Sesión',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }

    //Comprobar si el Usuario existe

    const { email, password } = req.body;
    
    const usuario = await Usuario.findOne({where: { email }})
    if(!usuario) {
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken,
            errores: [{msg: 'El Usuario No Existe'}]
        })
    }

    //Comprobar si el Usuario si esta confirmado.

    if(!usuario.confirm){
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken,
            errores: [{msg: 'El Usuario No Ha Sido Confirmado'}]
        })
    }

    /**Revisar el Password*/
    if(!usuario.verificarPassword(password)){
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken,
            errores: [{msg: 'El Password es Incorrecto'}]
        })
    }

    //Autenticar el Usuario
   /** const token = jwt.sign({ //información que se quiere colocar con jwt
        nombre:'Jose',
        empres: 'Sena',
        Tecnologia: 'Node.js'
    }, 'palabraSupersecretasssss', {
        expiresIn: '1d'
    })
    console.log(token);*/
    const token = generarJWT({id: usuario.id, nombre: usuario.nombre})
    console.log(token);

    //Almacenar en un Cookie
    return res.cookie('_token', token, {
        httpOnly: true, //evita los ataques cross, no ser accesile desde la appi de javascript
        secure:true, 
        sameSite: true

    }).redirect('/mispropiedades')
}
const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        title:'Crear Cuenta',
        pagina: 'Crear Cuenta',
        csrfToken: req.csrfToken
    })
};

const registrar = async (req, res) => {
    // console.log('Registrando...');
    //Validar Campos
    await check('name').notEmpty().withMessage('Nombre Obligatorio!').run(req);
    await check('lastname').notEmpty().withMessage('Apellido Obligatorio!').run(req);
    await check('email').isEmail().withMessage('No tiene formato de correo!').run(req);
    await check('password').isLength({ min: 8 }).withMessage('El Mínimo para la contraseña es de (8) Caracteres!').run(req);
    await check('repetir_password').equals(req.body.password).withMessage('Las contraseñas no son iguales!').run(req);

    let resultado = validationResult(req);

    //verificar que el resultado este vacio
    if (!resultado.isEmpty()) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken,
            errores: resultado.array()
        })
    }

    const { name,lastname,email,password } = req.body;
    //verificar que el usuario no exista
    const existeUsuario = await Usuario.findOne({ where: { email } })
    if (existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken,
            errores: [{ msg: 'El Usuario Ya Existe! ' }]
        })
    }

    const usuario = await Usuario.create({
        name,
        lastname,
        email,
        password,
        token: generateId(),
    })

    //Envía email de confirmación
    emailRegistro({
        name: usuario.name,
        lastname:usuario.lastname,
        email: usuario.email,
        token: usuario.token
    })

    //Mensaje de confirmación cuando se crea el Usuario
    res.render('templates/mensaje', {
        pagina: 'Su registro fue exitoso!',
        mensaje: 'Se ha enviado un correo de confirmación, presione en el enlace'
    })

};

//Función que permite confirmar la cuenta
const confirmar = async (req, res) => {
    const { token } = req.params;

    //Verificar si el token es válido
    const usuario = await Usuario.findOne({ where: { token } })

    if (!usuario) {
        return res.render('auth/confirmarcuenta', {
            pagina: 'Error al confirmar cuenta',
            mensaje: 'Hubo un error en la confirmación de la cuenta, intente de nuevo',
            error: true
        })
    }
    //Si no hay error se confirma la cuenta en la BD
    usuario.token = null;
    usuario.confirm = true;
    await usuario.save();

    res.render('auth/confirmarcuenta', {
        title:'Confirmación de cuenta',
        pagina: 'Cuenta Confirmada!',
        mensaje: 'Su cuenta se confirmo correctamente!'
    })
}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        title: 'Recuperar Contraseña',
        pagina: 'Recuperar Contraseña',
        csrfToken: req.csrfToken
    })
};

const recuperaPassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recuperar Password',
        csrfToken: req.csrfToken
    })
};


const resetPassword = async (req, res) => {
    await check('email').isEmail().withMessage('No tiene formato de correo').run(req);
    let resultado = validationResult(req);

    //verificar que el resultado este vacio
    if (!resultado.isEmpty()) {
        return res.render('auth/olvide-password', {
            title:'Recuperar contraseña',
            pagina: 'Recuperar Contraseña',
            csrfToken: req.csrfToken,
            errores: resultado.array()
        })
    }

    const { email } = req.body;
    const usuario = await Usuario.findOne({ where: { email } })
    console.log(usuario);

    //console.log usuario

    if (!usuario) {
        return res.render('auth/olvide-password', {
            title:'Recuperar contraseña',
            pagina: 'Recuperar Contraseña',
            csrfToken: req.csrfToken,
            errores: [{ msg: "El email ingresado no pertenece a ningún usuario!" }]
        })
    }

    //GENERAR TOKEN NUEVO

    usuario.token = generateId();
    await usuario.save();

    //enviar el email, se pasa el objeto con todos los datos
    emailOlvidePassword({
        email: usuario.email,
        name: usuario.name,
        lastname: usuario.lastname,
        token: usuario.token

    })

    res.render("templates/mensaje", {
        title:'Recuperar contraseña',
        pagina: "Envío de mensaje exitoso!",
        mensaje: "Al correo se han enviado las instrucciones a seguir."

    })

}

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const usuario = await Usuario.findOne({ where: { token } })

    if (!usuario) {
        return res.render("auth/confirmarcuenta", {
            pagina: "Restablece su contraseña",
            mensaje: "Hubo un error al validar su información, intente de nuevo",
            error: true

        })
    }

    res.render("auth/reset-Password", {
        pagina: "restablecer password",
        csrfToken: req.csrfToken


    })

}
const nuevoPassword = async (req, res) => {

    //validar password
    await check('password').isLength({ min: 8 }).withMessage('El Mìnimo para el pass es de (8)').run(req)
    let resultado = validationResult(req)

    if (!resultado.isEmpty()) {
        return res.render('auth/reset-Password', {
            pagina: 'Restablecer Password',
            csrfToken: req.csrfToken,
            errores: resultado.array()
        })
    }

    const { token } = req.params;
    const { password } = req.body;

    //identificar quien hace el cambio

    const usuario = await Usuario.findOne({ where: { token } })

    //hashear el nuevo password
    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null;

    await usuario.save();

    res.render("auth/confirmarcuenta", {
        pagina: "Password restablecido",
        mensaje: " El password se guardo correctamente"

    })
}


const Sesion = (req, res) => {
	return res.clearCookie("_token").status(200).redirect("/auth/login");
};

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword,
    confirmar,
    resetPassword,
    comprobarToken,
    nuevoPassword,
    autenticar,
    recuperaPassword,
    Sesion
};