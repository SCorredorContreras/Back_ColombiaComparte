const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const { validate } = require('../middlewares/validate');

router.get(
  '/',
  verifyToken,
  authorizeRoles('superadmin'),
  userController.listUsers
);

router.put(
  '/:id/status',
  verifyToken,
  authorizeRoles('superadmin'),
  [
    body('estado').notEmpty().withMessage('Estado obligatorio'),
    validate
  ],
  userController.changeStatus
);

router.post(
  '/',
  verifyToken,
  authorizeRoles('superadmin'),
  [
    body('nombre').notEmpty(),
    body('apellido').notEmpty(),
    body('email').isEmail(),
    body('username').notEmpty(),
    body('password').isLength({ min: 6 }),
    body('rol_id').isInt(),
    validate
  ],
  userController.createUser
);

module.exports = router;