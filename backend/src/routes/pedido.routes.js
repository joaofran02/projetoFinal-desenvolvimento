const express = require('express')
const router = express.Router()

const {
    criar
} = require('../controllers/pedido.controller')

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware')
const isAdminMiddleware = require('../middlewares/isAdmin.middleware')

// POST /produto
router.post(
    '/',
    authMiddleware,      
    criar
)

module.exports = router
