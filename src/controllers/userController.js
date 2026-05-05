const userService = require('../services/userService');
const { logAction } = require('../services/auditService');

const listUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const changeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const user = await userService.changeUserStatus(id, estado);

    await logAction({
      usuario_id: req.user.id,
      accion: 'cambiar estado usuario',
      modulo: 'usuarios',
      registro_id: id,
      descripcion: `Cambió estado a ${estado}`,
      ip: req.ip
    });

    return res.json({
      message: 'Estado actualizado correctamente',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    await logAction({
      usuario_id: req.user.id,
      accion: 'crear usuario',
      modulo: 'usuarios',
      registro_id: user.id,
      descripcion: `Creó usuario ${user.username}`,
      ip: req.ip
    });

    return res.status(201).json({
      message: 'Usuario creado correctamente',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listUsers,
  changeStatus,
  createUser,
};