const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const contactRequestController = require('../controllers/contactRequestController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { validate } = require('../middlewares/validate');

/*
  RUTA PÚBLICA
*/

router.post(
  '/public',
  [
    body('nombre').notEmpty().withMessage('Nombre obligatorio'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('telefono').notEmpty().withMessage('Teléfono obligatorio'),
    body('finalidad').notEmpty().withMessage('Finalidad obligatoria'),
    body('pais_id').isInt().withMessage('pais_id debe ser numérico'),
    validate
  ],
  contactRequestController.createPublicRequest
);

/*
  RUTAS ADMINISTRATIVAS
*/

router.get(
  '/',
  verifyToken,
  authorizeRoles('superadmin', 'admin_pais', 'editor'),
  contactRequestController.listRequests
);

router.put(
  '/:id/status',
  verifyToken,
  authorizeRoles('superadmin', 'admin_pais'),
  [
    body('estado').notEmpty().withMessage('Estado obligatorio'),
    validate
  ],
  contactRequestController.updateRequestStatus
);

router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('superadmin', 'admin_pais'),
  contactRequestController.deleteRequest
);

module.exports = router;