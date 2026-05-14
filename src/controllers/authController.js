const authService = require('../services/authService');
const { logAction } = require('../services/auditService');

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    await logAction({
      usuario_id: result.user.id,
      accion: 'login',
      modulo: 'auth',
      descripcion: 'Inicio de sesión exitoso',
      ip: req.ip
    });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {

    const result = await authService.forgotPassword(req.body);

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {

    const result = await authService.resetPassword(req.body);

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};


const register = async (req, res, next) => {
  try {
   
    const userData = {
      ...req.body,
      rol_id: req.body.rol_id || 3 
    };

    const result = await authService.register(userData);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};




const changePassword = async (req, res, next) => {
  try {

    const {
      password_actual,
      nueva_password
    } = req.body;

    const result = await authService.changePassword(
      req.user.id,
      password_actual,
      nueva_password
    );

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};

const changeSecurityQuestion = async (req, res, next) => {
  try {

    const {
      pregunta_seguridad,
      respuesta_seguridad
    } = req.body;

    const result = await authService.changeSecurityQuestion(
      req.user.id,
      pregunta_seguridad,
      respuesta_seguridad
    );

    return res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};



  module.exports = {
  login,
  register,  // <- agregar
  forgotPassword,
  resetPassword,
  changePassword,
  changeSecurityQuestion,
};
