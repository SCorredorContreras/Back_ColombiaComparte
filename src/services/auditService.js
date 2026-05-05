const auditRepository = require("../repositories/auditRepository");

const logAction = async ({
  usuario_id,
  accion,
  modulo,
  registro_id = null,
  descripcion,
  ip = null
}) => {
  return await auditRepository.createLog({
    usuario_id,
    accion,
    modulo,
    registro_id,
    descripcion,
    ip
  });
};

module.exports = {
  logAction
};