const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const newsController = require('../controllers/newsController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { validate } = require('../middlewares/validate');

/*
  RUTAS PÚBLICAS
*/

router.get(
  '/public/:countrySlug',
  newsController.listPublicNews
);

router.get(
  '/public/:countrySlug/:newsSlug',
  newsController.getPublicNewsDetail
);

/*
  RUTAS ADMINISTRATIVAS
*/

router.get(
  '/',
  verifyToken,
  authorizeRoles('superadmin', 'admin_pais', 'editor'),
  newsController.listNews
);

router.post(
  '/',
  verifyToken,
  authorizeRoles('superadmin', 'admin_pais', 'editor'),
  [
    body('titulo').notEmpty().withMessage('El título es obligatorio'),
    body('resumen').notEmpty().withMessage('El resumen es obligatorio'),
    body('contenido').notEmpty().withMessage('El contenido es obligatorio'),
    body('pais_id')
      .optional()
      .isInt()
      .withMessage('El pais_id debe ser numérico'),
    validate
  ],
  newsController.createNews
);

router.put(
  '/:id',
  verifyToken,
  authorizeRoles('superadmin', 'admin_pais', 'editor'),
  [
    body('titulo').optional().notEmpty(),
    body('resumen').optional().notEmpty(),
    body('contenido').optional().notEmpty(),
    body('estado')
      .optional()
      .isIn(['borrador', 'publicado', 'despublicado'])
      .withMessage('Estado inválido'),
    validate
  ],
  newsController.updateNews
);

router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('superadmin', 'admin_pais'),
  newsController.deleteNews
);

module.exports = router;