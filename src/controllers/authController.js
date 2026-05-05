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

module.exports = {
  login,
};