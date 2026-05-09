const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');

const login = async ({ username, password }) => {
  if (!username || !password) {
    throw new Error('El usuario y la contraseña son obligatorios');
  }

  const user = await authRepository.findUserByUsername(username);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  if (user.estado !== 'activo') {
    throw new Error('El usuario se encuentra inactivo');
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    throw new Error('Contraseña incorrecta');
  }

  await authRepository.updateLastAccess(user.id);

  const rol = user.roles?.nombre;
  const pais = user.paises || null;

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      rol,
      pais_id: user.pais_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  return {
    message: 'Inicio de sesión exitoso',
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      username: user.username,
      rol,
      pais,
    },
  };
};

const forgotPassword = async ({ identifier }) => {

  if (!identifier) {
    throw new Error('El identificador es obligatorio');
  }

  const user = await authRepository.findUserByIdentifier(identifier);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  return {
    message: 'Pregunta de seguridad encontrada',
    username: user.username,
    pregunta_seguridad: user.pregunta_seguridad
  };
};

const resetPassword = async ({
  username,
  respuesta_seguridad,
  nueva_password
}) => {

  const user = await authRepository.findUserByIdentifier(username);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const validAnswer = await bcrypt.compare(
    respuesta_seguridad,
    user.respuesta_seguridad_hash
  );

  if (!validAnswer) {
    throw new Error('Respuesta de seguridad incorrecta');
  }

  const password_hash = bcrypt.hashSync(nueva_password, 10);

  await authRepository.updatePassword(
    user.id,
    password_hash
  );

  return {
    message: 'Contraseña actualizada correctamente'
  };
};

const changePassword = async (
  userId,
  password_actual,
  nueva_password
) => {

  const user = await authRepository.findUserById(userId);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const validPassword = await bcrypt.compare(
    password_actual,
    user.password_hash
  );

  if (!validPassword) {
    throw new Error('La contraseña actual es incorrecta');
  }

  const password_hash = bcrypt.hashSync(
    nueva_password,
    10
  );

  await authRepository.updatePassword(
    user.id,
    password_hash
  );

  return {
    message: 'Contraseña actualizada correctamente'
  };
};

const changeSecurityQuestion = async (
  userId,
  pregunta_seguridad,
  respuesta_seguridad
) => {

  const respuesta_seguridad_hash = bcrypt.hashSync(
    respuesta_seguridad,
    10
  );

  await authRepository.updateSecurityQuestion(
    userId,
    pregunta_seguridad,
    respuesta_seguridad_hash
  );

  return {
    message: 'Pregunta de seguridad actualizada correctamente'
  };
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  changeSecurityQuestion,
};