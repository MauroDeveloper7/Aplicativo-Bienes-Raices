import { DataTypes } from 'sequelize';
import bcryptjs from 'bcryptjs';
import db from '../config/db.js';

const Usuario = db.define('usuarios', {
    name: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN
}, {
    hooks: {
        beforeCreate: async function(usuario) {
            const salt = await bcryptjs.genSalt(10);
            usuario.password = await bcryptjs.hash(usuario.password, salt);
        }
    },

    scopes: {
        eliminarPassword: {
            attributes: {
                exclude: ['password','token','confirm','createdAt','updatedAt',],
            },
        },
    },
});

Usuario.prototype.verificarPassword = function(password){
    return bcryptjs.compareSync(password, this.password);
}

export default Usuario;