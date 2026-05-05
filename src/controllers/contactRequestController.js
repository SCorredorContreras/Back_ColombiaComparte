const contactRequestService = require('../services/contactRequestService');
const { logAction } = require('../services/auditService');

const listRequests = async (req, res, next) => {
  try {
    const requests = await contactRequestService.getRequests(req.user);
    return res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
};

const createPublicRequest = async (req, res, next) => {
  try {
    const request = await contactRequestService.createPublicRequest(req.body);

    return res.status(201).json({
      message: 'Solicitud enviada correctamente',
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

const updateRequestStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const request = await contactRequestService.updateRequestStatus(
      id,
      req.body,
      req.user
    );

    await logAction({
      usuario_id: req.user.id,
      accion: 'actualizar estado solicitud',
      modulo: 'solicitudes_contacto',
      registro_id: id,
      descripcion: `Cambió estado a ${req.body.estado}`,
      ip: req.ip
    });

    return res.status(200).json({
      message: 'Solicitud actualizada correctamente',
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contactRequestService.deleteRequest(id, req.user);

    await logAction({
      usuario_id: req.user.id,
      accion: 'eliminar solicitud',
      modulo: 'solicitudes_contacto',
      registro_id: id,
      descripcion: `Eliminó solicitud ID ${id}`,
      ip: req.ip
    });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listRequests,
  createPublicRequest,
  updateRequestStatus,
  deleteRequest,
};