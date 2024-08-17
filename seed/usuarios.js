import bcryptjs from 'bcryptjs';

const usuarios = [
	{
		name: "Mauricio",
        lastname:"Duque Aricapa",
		email: "Mauricio@m.com",
		confirm: 1,
		password: bcrypt.hashSync("contrasena", 10),
	},
	// Add other users if needed
];

export default usuarios;