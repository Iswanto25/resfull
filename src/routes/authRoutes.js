const authRoutes = require('express').Router();
const authController = require('../controllers/authController')

authRoutes.post("/sign-up", authController.signup);
authRoutes.post("/sign-in", authController.signin);

module.exports=authRoutes;