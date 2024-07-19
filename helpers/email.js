import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    const { email,name,lastname, token } = datos
    //se envía el email
    await transport.sendMail({
        from: "BienesRaíces.com",
        to: email,
        subject: 'Confirma tu cuenta de BienesRaíces.com',
        text: 'Confirma tu cuenta en BienesRaíces.com',
        html:
            `<p>Hola ${name},${lastname}! Confirma tu cuenta en BienesRaíces.com</p>
                <p>Tu cuenta ya esta lista, solo debes de confirmar en el enlace:
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta</a></p>
                <p>Si no creo la cuenta, ignora el mensaje<p>`
    });
}


const emailOlvidePassword = async (datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })
    const { name,lastname, email, token } = datos;
    await transport.sendMail({
        from: "BienesRaíces.com",
        to: email,
        subject: 'Restablece BienesRaíces.com',
        text: 'Restablece tu contraseña en BienesRaíces.com',
        html:
            `<p>Hola ${name} ${lastname}! 
                Haz solicitado restablecer tu password en  BienesRaíces.com</p>
                <p>Sigue el siguiente enlace para generar un password nuevo:
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Restablecer password</a></p>
                <p>Si no solicitaste el cambio de password, puedes ignorar el mensaje<p>`
    })
}

export {
        emailRegistro,
        emailOlvidePassword
}