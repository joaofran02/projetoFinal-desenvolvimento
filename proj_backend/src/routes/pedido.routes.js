const express = require('express')
const router = express.Router()

const { 
    criar, 
    listar, 
    atualizar
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

// GET – Listar pedidos (qualquer usuário logado)
router.get(
    '/',
    authMiddleware,
    listar
)

// Atualizar parcialmente
router.patch(
    '/:id',
    authMiddleware,
    isAdminMiddleware,
    atualizar
)

module.exports = router
