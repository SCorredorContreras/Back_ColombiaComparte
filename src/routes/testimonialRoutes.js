const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const testimonialController = require('../controllers/testimonialController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { validate } = require('../middlewares/validate');

/*
  RUTAS PÚBLICAS
*/

router.get(
  '/public/:countrySlug',
  testimonialController.listPublicTestimonials
);

/*
  RUTAS ADMINISTRATIVAS
*/

router.get(
  '/',
  verifyToken,
  authorizeRoles('superadmin', 'admin_pais', 'editor'),
  testimonialController.listTestimonials
);

router.post(
  '/',
  verifyToken,
  authorizeRoles('superadmin', 'admin_pais', 'editor'),
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('contenido').notEmpty().withMessage('El contenido es obligatorio'),
    body('foto_url').notEmpty().withMessage('La foto es obligatoria'),
    validate
  ],
  testimonialController.createTestimonial
);

router.put(
  '/:id',
  verifyToken,
  authorizeRoles('superadmin', 'admin_pais', 'editor'),
  validate,
  testimonialController.updateTestimonial
);

router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('superadmin', 'admin_pais'),
  testimonialController.deleteTestimonial
);

module.exports = router;