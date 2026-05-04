const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

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
  userController.changeStatus
);

router.post(
  '/',
  verifyToken,
  authorizeRoles('superadmin'),
  userController.createUser
);

module.exports = router;