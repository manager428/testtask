const express = require('express');
const { authController, userController } = require('../controllers');
const router = express.Router();

router.get('/', authController.authMiddleware, userController.getAll);
router.get('/:user_id', authController.authMiddleware, userController.get);
router.post('/', authController.authMiddleware, userController.createUser);
router.put('/:user_id', authController.authMiddleware, userController.update);
router.delete('/:user_id', authController.authMiddleware, userController.destory);

module.exports = router;
