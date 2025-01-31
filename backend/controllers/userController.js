const User = require("../models/User");

const register = async (req, res) => {
  //funcion para crear usuario
  const { username, password, email } = req.body;//se extrae informacion del body del request
  try {
    const existingEmail = await User.findByEmail(email); //se valida con metodo si existe email
    const existingUser = await User.findByUsername(username); // se valida con metodo si existe username
    if (existingUser || existingEmail) {
      //se valida si ambas existen
      return res.status(400).json({ error: "Usuario ya existe" }); //mensaje de servidor ya existe
    }
    const UserId = await User.create(username, password, email); //se crea usuario
    res.status(201).json({ id: UserId, username }); //se devuelve usuario creado
  } catch (error) {
    res.status(500).json({ err: "error al crear el usuario" });
  }
};

const login = async (req, res) => {
  //funcion para hacer login
  const { username, password } = req.body; //se extrae datos de body

  try {
    const user = await User.findByUsername(username); //se extrae usuario y se valida contraseña
    if (!user || user.password !== password) {
      return res.status(401).json({ err: "credenciales incorrectas" });//error no coincide informacion
    }
    res.json({ id: user.id, username: user.username }); //se devuelve usuario si es correcto
  } catch (error) {
    res.status(500).json({ err: "error al iniciar sesion" });
  }
};

module.exports = { register, login };
